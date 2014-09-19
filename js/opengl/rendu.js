
function Rendu()
{
  this.nbPoints = 3;
	this.modeDessin = gl.TRIANGLES;
	this.points = new Array(3);
	this.vbo = new Array(3);
	for(var i = 0; i < 3; i++)
	{
		this.points[i] = null;
		this.vbo[i] = null;
	}
}





Rendu.prototype.setup = function()
{
	this.points[0] = [ 0, 0, 0,
									1, 0, 0,
									0, 1, 0];
	this.calculerNormales();

	this.vbo[0] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[0]), gl.STATIC_DRAW);
	
	this.vbo[1] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[1]), gl.STATIC_DRAW);
}



Rendu.prototype.calculerNormaleFace = function(p1, p2, p3)
{
	var v1 = new Vecteur3D();
	var v2 = new Vecteur3D();
	var normale = new Vecteur3D();
	
	v1 = p1.moins(p2);
	v2 = p2.moins(p3);
	//normale = v2.produitVectoriel(v1);
	normale = v1.produitVectoriel(v2);

	normale.normaliser();
	return normale;
}



Rendu.prototype.calculerNormales = function()
{
	this.points[1] = new Array(this.points[0].length);
	for(var i = 0; i < this.points[0].length/9; i++)
	{
		var p1 = new Vecteur3D(this.points[0][i], this.points[0][i+1], this.points[0][i+2]);
		var p2 = new Vecteur3D(this.points[0][i+3], this.points[0][i+4], this.points[0][i+5]);
		var p3 = new Vecteur3D(this.points[0][i+6], this.points[0][i+7], this.points[0][i+8]);
		var normale = this.calculerNormaleFace(p1, p2, p3);
		this.points[1][i] = normale.x; this.points[1][i+1] = normale.y; this.points[1][i+2] = normale.z; 
		this.points[1][i+3] = normale.x; this.points[1][i+4] = normale.y; this.points[1][i+5] = normale.z; 
		this.points[1][i+6] = normale.x; this.points[1][i+7] = normale.y; this.points[1][i+8] = normale.z; 
	}
}



Rendu.prototype.draw = function(program)
{
	gl.enableVertexAttribArray(program.vLoc);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
	gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
	
	gl.enableVertexAttribArray(program.nLoc);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
	gl.vertexAttribPointer(program.nLoc, 3, gl.FLOAT, false, 0, 0);
	
	gl.drawArrays(this.modeDessin, 0, this.nbPoints);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}



