
/*///// CLASSE TEXTURE ////////////////////////////////////////*/

function Texture(chemin)
{
  this.texture;
  this.charger(chemin);
}


Texture.prototype.charger = function(chemin)
{
  this.texture = gl.createTexture();
  this.texture.image = new Image();
  this.texture.image.src = chemin;
  var clone = this;
  this.texture.image.addEventListener("load", clone.bind(clone.texture), false);
}


Texture.prototype.bind = function(texture)
{
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}


Texture.prototype.get = function()
{
  return this.texture;
}


