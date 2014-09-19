
function Program()
{
  this.program = null;
  this.isLoaded = false;
  this.nomFichier
}


Program.prototype.setup = function(nomFichier) 
{
  this.nomFichier = nomFichier;
  this.program = gl.createProgram();
  var cheminVertex = nomFichier+".vertex";
  loadFile(cheminVertex, this.apply.bind(this)); // permet de recuperer instance de classe dans le callback
}




Program.prototype.apply = function(data) 
{
  this.creerShader('vertex', data);
  var cheminPixel = this.nomFichier+".pixel";
  loadFile(cheminPixel, this.secondApply.bind(this));
}




Program.prototype.secondApply = function(data)
{

  this.creerShader('fragment', data);
  gl.linkProgram(this.program);
  gl.useProgram(this.program);
  if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) 
  {
    alert("Ne peux pas lier le shader au program");
    gl.deleteProgram(this.program);
    return;
  }
  this.creerLocations();
  this.isLoaded = true;
} 





Program.prototype.creerShader = function(type, source)
{
  var s = gl.createShader((type == 'vertex') ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) 
  {	    
    alert ("Peux pas compiler "+type+" shader:\n\n"+gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return;
  }
  
  gl.attachShader(this.program, s);
  gl.deleteShader(s);
}





Program.prototype.creerLocations = function()
{
  // ATTRIB
  this.program.vLoc = gl.getAttribLocation(this.program, "Vertice");
  this.program.nLoc = gl.getAttribLocation(this.program, "Normale");
  this.program.tLoc = gl.getAttribLocation(this.program, "Texture");
 
 	// UNIFORM
  this.program.pMatLoc = gl.getUniformLocation(this.program, "projection");
  this.program.mMatLoc = gl.getUniformLocation(this.program, "model");
  this.program.vMatLoc = gl.getUniformLocation(this.program, "view");
  this.program.nMatLoc = gl.getUniformLocation(this.program, "normalmatrix");
  this.program.sMatLoc = gl.getUniformLocation(this.program, "shadowmatrix");
   
  this.program.posLumLoc = gl.getUniformLocation(this.program, "posLum");
  this.program.posEyeLoc = gl.getUniformLocation(this.program, "posEye");
  this.program.dirEyeLoc = gl.getUniformLocation(this.program, "dirEye");
  this.program.ambiantLoc = gl.getUniformLocation(this.program, "ambiant");
  this.program.diffuseLoc = gl.getUniformLocation(this.program, "diffuse");
  this.program.specularLoc = gl.getUniformLocation(this.program, "specular");
  this.program.ampliLoc = gl.getUniformLocation(this.program, "amplitude");
  this.program.typeLoc = gl.getUniformLocation(this.program, "type");
  this.program.brillanceLoc = gl.getUniformLocation(this.program, "brillance");
  this.program.timeLoc = gl.getUniformLocation(this.program, "time");
  this.program.freqLoc = gl.getUniformLocation(this.program, "frequency");
  
  this.program.colorMapLoc = gl.getUniformLocation(this.program, "colorMap");
  this.program.normalMapLoc = gl.getUniformLocation(this.program, "normalMap");
  this.program.depthMapLoc = gl.getUniformLocation(this.program, "depthMap");
  this.program.modelShadowLoc = gl.getUniformLocation(this.program, "modelShadow");
}



Program.prototype.get = function() { return this.program; }
Program.prototype.isReady = function() { return this.isLoaded; }


