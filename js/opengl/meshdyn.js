
function MeshDyn()
{
	this.program = new Program();
	this.dynamique = new Dynamique();
	this.position = new vec3();
	this.rotation = new vec3();
	this.taille = new vec3(1, 1, 1);
	this.ambiant = new vec3(0, 0, 1);
	this.diffuse = new vec3(0, 1, 0);
	this.specular = new vec3(1, 0, 0);
	this.brillance = 60.0;
	this.cheminProgram = "shader/modifier";	
	this.time = 0.0;
}



MeshDyn.prototype.setup = function()
{
	this.program.setup(this.cheminProgram);
	this.dynamique.setup();
}



MeshDyn.prototype.draw = function(projection, model, view)
{
	model.push();
	model.translate(this.position.x, this.position.y, this.position.z);
	model.scale(this.taille.x, this.taille.y, this.taille.z);
	model.rotate(this.rotation.x, 1,0,0);
	model.rotate(this.rotation.y, 0,1,0);
	model.rotate(this.rotation.z, 0,0,1);
	var normalmatrix = new mat3();
	normalmatrix.set(model.getMatrice3x3());
	normalmatrix.inverser();

	gl.useProgram(this.program.get());

	// matrice
	gl.uniformMatrix4fv(this.program.get().pMatLoc, false, projection.transpose());
	gl.uniformMatrix4fv(this.program.get().mMatLoc, false, model.transpose());
	gl.uniformMatrix4fv(this.program.get().vMatLoc, false, view.transpose());
	gl.uniformMatrix3fv(this.program.get().nMatLoc, false, normalmatrix.get());
	
	// extras
	gl.uniform3fv(this.program.get().ambiantLoc, this.ambiant.get());
	gl.uniform3fv(this.program.get().diffuseLoc, this.diffuse.get());
	gl.uniform3fv(this.program.get().specularLoc, this.specular.get());
	gl.uniform1f(this.program.get().brillanceLoc, this.brillance);
	
	this.dynamique.draw(this.program.get());
	model.pop();
}


MeshDyn.prototype.setLumiere = function(lampe, camera)
{
	gl.useProgram(this.program.get());
	gl.uniform3fv(this.program.get().posLumLoc, lampe.get());
	gl.uniform3fv(this.program.get().posEyeLoc, camera.get());

	gl.uniform1f(this.program.get().timeLoc, this.time);
	this.time += 0.1;
	gl.uniform1f(this.program.get().freqLoc, 1.0);
}


MeshDyn.prototype.interaction = function(input)
{
	this.rotation.y = UTILS_map(input.getSourisX(), 0, 1300, 0, 360);
	this.rotation.x = UTILS_map(input.getSourisY(), 0, 800, 0, 360);
}




MeshDyn.prototype.setPosition = function(x, y, z){ this.position.set(x, y, z); }
MeshDyn.prototype.setTaille = function(x, y, z){ this.taille.set(x, y, z); }
MeshDyn.prototype.setRotation = function(x, y, z){ this.rotation.set(x, y, z); }
MeshDyn.prototype.setAmbiant = function(x, y, z){ this.ambiant.set(x/255, y/255, z/255); }
MeshDyn.prototype.setDiffuse = function(x, y, z){ this.diffuse.set(x/255, y/255, z/255); }
MeshDyn.prototype.setSpecular = function(x, y, z){ this.specular.set(x/255, y/255, z/255); }
MeshDyn.prototype.setProgram = function(chemin){ this.cheminProgram = chemin; }

MeshDyn.prototype.getPosition = function(){ return this.position; }
MeshDyn.prototype.getTaille = function(){ return this.taille; }
MeshDyn.prototype.getRotation = function(){ return this.rotation; }


