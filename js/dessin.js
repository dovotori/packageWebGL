
function Dessin()
{

	this.input = new Input();
	this.camera = new Camera();
	


	this.program = new Program();
	//this.objet = new Objet();
	//this.model = new mat4();
	this.mesh = new Mesh();
}




Dessin.prototype.setup = function()
{
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	//this.model.identity();

	this.camera.setup();
	this.mesh.setup();
	//this.program.setup("shader/basique");
	//this.objet.setup("objet/cube.obj");

}




Dessin.prototype.draw = function()
{
	this.interaction();

	/*
	if(this.program.isReady()){

		gl.useProgram(this.program.get());

		gl.uniformMatrix4fv(this.program.get().pMatLoc, false, this.camera.getProjection().transpose());
		gl.uniformMatrix4fv(this.program.get().vMatLoc, false, this.camera.getView().transpose());
		gl.uniformMatrix4fv(this.program.get().mMatLoc, false, this.model.get());
		
		this.objet.draw(this.program.get());
	}
	*/
	this.draw(this.camera.getProjection().transpose(), this.camera.getView().transpose());
}



Dessin.prototype.interaction = function()
{
	
}



