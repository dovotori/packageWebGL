
function Dynamique()
{
  this.nbPoints = 3;
	this.modeDessin = gl.TRIANGLES;
	this.points = new Array(2);
	this.vbo = new Array(2);
	for(var i = 0; i < 2; i++)
	{
		this.points[i] = null;
		this.vbo[i] = null;
	}
}





Dynamique.prototype.setup = function()
{
	//var fichier = new Xhr("objet/sphere.obj");
	//var obj = new LoadObj(fichier.get());

	var hm = new Heightmap();
	hm.setDimensions(40, 40);
	hm.setup();

	this.points[0] = hm.getVertices();
	this.nbPoints = hm.getNbFaces() * 3;

	var n = new Normale();
	n.inverser();
	n.setup(this.points[0], hm.getNbFaces(), hm.getIdVertices(), hm.getNbPoints());
	this.points[1] = n.getSmooth();

	this.vbo[0] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[0]), gl.STATIC_DRAW);
	
	this.vbo[1] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[1]), gl.STATIC_DRAW);
}




Dynamique.prototype.draw = function(program)
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



