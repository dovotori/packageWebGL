
function Objet()
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
	this.isLoaded = false;
}



Objet.prototype.setup = function(chemin)
{
	loadFile(chemin, this.apply.bind(this));
}



Objet.prototype.apply = function(data)
{
	var obj = new LoadObj(data);
	this.points[0] = obj.getVertices();
	this.points[1] = obj.getNormales();
	this.points[2] = obj.getTextures();
	this.nbPoints = obj.getNbFaces() * 3;
	
	this.vbo[0] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[0]), gl.STATIC_DRAW);
	
	this.vbo[1] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[1]), gl.STATIC_DRAW);
	
	this.vbo[2] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[2]);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points[2]), gl.STATIC_DRAW);
	this.isLoaded = true;
}




Objet.prototype.draw = function(program)
{
	if(program.vLoc == 0){
		gl.enableVertexAttribArray(program.vLoc);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[0]);
		gl.vertexAttribPointer(program.vLoc, 3, gl.FLOAT, false, 0, 0);
	}

	if(program.nLoc == 0){
		gl.enableVertexAttribArray(program.nLoc);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[1]);
		gl.vertexAttribPointer(program.nLoc, 3, gl.FLOAT, false, 0, 0);
	}

	if(program.tLoc == 0){
		gl.enableVertexAttribArray(program.tLoc);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo[2]);
		gl.vertexAttribPointer(program.tLoc, 2, gl.FLOAT, false, 0, 0);
	}	

	gl.drawArrays(this.modeDessin, 0, this.nbPoints);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

Objet.prototype.isReady = function(){ return this.isLoaded; }

