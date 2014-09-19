
function Mesh()
{
	this.program = new Program();
	this.objet = new Objet();
	this.position = new vec3(0, 0, 0);
	this.rotation = new vec3(0, 0, 0);
	this.taille = new vec3(1, 1, 1);
	this.ambiant = new vec3(0, 0, 1);
	this.diffuse = new vec3(0, 1, 0);
	this.specular = new vec3(1, 0, 0);
	this.brillance = 60.0;
	this.cheminObj = "objet/cube.obj";	
	this.cheminProgram = "shader/basique";
	this.model = new mat4();
}



Mesh.prototype.setup = function()
{
	this.objet.setup(this.cheminObj);
	this.program.setup(this.cheminProgram);
	this.model.identity();
}



Mesh.prototype.draw = function(projection, view)
{
	if(this.program.isReady() && this.objet.isReady())
	{

		this.model.push();
		this.model.translate(this.position.x, this.position.y, this.position.z);
		this.model.scale(this.taille.x, this.taille.y, this.taille.z);
		this.model.rotate(this.rotation.x, 1,0,0);
		this.model.rotate(this.rotation.y, 0,1,0);
		this.model.rotate(this.rotation.z, 0,0,1);
		var normalmatrix = new mat3();
		normalmatrix.set(this.model.getMatrice3x3());
		normalmatrix.inverser();

		gl.useProgram(this.program.get());

		// matrice
		gl.uniformMatrix4fv(this.program.get().pMatLoc, false, projection.transpose());
		gl.uniformMatrix4fv(this.program.get().mMatLoc, false, this.model.transpose());
		gl.uniformMatrix4fv(this.program.get().vMatLoc, false, view.transpose());
		gl.uniformMatrix3fv(this.program.get().nMatLoc, false, normalmatrix.get());
		
		// extras
		gl.uniform3fv(this.program.get().ambiantLoc, this.ambiant.get());
		gl.uniform3fv(this.program.get().diffuseLoc, this.diffuse.get());
		gl.uniform3fv(this.program.get().specularLoc, this.specular.get());
		gl.uniform1f(this.program.get().brillanceLoc, this.brillance);
		
		this.objet.draw(this.program.get());
		
		this.model.pop();
	}
}


Mesh.prototype.setLumiere = function(lampe, camera)
{
	gl.useProgram(this.program.get());
	gl.uniform3fv(this.program.get().posLumLoc, lampe.get());
	gl.uniform3fv(this.program.get().posEyeLoc, camera.get());
}


Mesh.prototype.interaction = function(input)
{
	//this.rotation.y = UTILS_map(input.getSourisX(), 0, 1300, 0, 360);
	//this.rotation.x = UTILS_map(input.getSourisY(), 0, 800, 0, 360);
	if(input.getClavier(37)){ this.position.x--; }
	if(input.getClavier(39)){ this.position.x++; }
	if(input.getClavier(38)){ this.position.z--; }
	if(input.getClavier(40)){ this.position.z++; }
	if(input.getClavier(79)){ this.position.y--; }
	if(input.getClavier(80)){ this.position.y++; }
}




Mesh.prototype.setPosition = function(x, y, z){ this.position.set(x, y, z); }
Mesh.prototype.setTaille = function(x, y, z){ this.taille.set(x, y, z); }
Mesh.prototype.setRotation = function(x, y, z){ this.rotation.set(x, y, z); }
Mesh.prototype.setAmbiant = function(x, y, z){ this.ambiant.set(x/255, y/255, z/255); }
Mesh.prototype.setDiffuse = function(x, y, z){ this.diffuse.set(x/255, y/255, z/255); }
Mesh.prototype.setSpecular = function(x, y, z){ this.specular.set(x/255, y/255, z/255); }
Mesh.prototype.setObj = function(chemin){ this.cheminObj = chemin; }
Mesh.prototype.setProgram = function(chemin){ this.cheminProgram = chemin; }

Mesh.prototype.getPosition = function(){ return this.position; }
Mesh.prototype.getTaille = function(){ return this.taille; }
Mesh.prototype.getRotation = function(){ return this.rotation; }


