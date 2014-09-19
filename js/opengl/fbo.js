
function Framebuffer()
{
  this.buffer;
  this.texture;

  this.setup();
}



Framebuffer.prototype.setup = function()
{
  // frame buffer qui contient l'ecran
  this.buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
  this.buffer.width = canvas.width;
  this.buffer.height = canvas.height;


  // texture vide qui contiendra l'image de l'ecran
  this.texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.buffer.width, this.buffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);


  // render buffer qui contient les infos couleurs pour la texture
  var renderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.buffer.width, this.buffer.height);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);


  // remise a zero
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  
}




Framebuffer.prototype.draw = function(mode, objet, cpt)
{
  view.push();
  view.lookAt(0,0,1, 0,0,0, 0,1,0);

  gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer); 
  gl.clearColor(0.0, 0.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  objet.rotate(cpt, cpt, 0);
  objet.lumiere(2, 2, 2);
  objet.draw(mode);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  view.pop();
}





Framebuffer.prototype.get = function(){ return this.buffer; }
Framebuffer.prototype.getTexture = function(){ return this.texture; }




