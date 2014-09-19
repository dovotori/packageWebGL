
function Dessin()
{

	this.input = new Input();
	this.camera = new Camera();
	
	this.program = new Program();
	this.mesh = new Mesh();
}




Dessin.prototype.setup = function()
{
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	this.camera.setup();
	this.mesh.setup();
}




Dessin.prototype.draw = function()
{
	this.interaction();
	this.mesh.draw(this.camera.getProjection(), this.camera.getView());
}



Dessin.prototype.interaction = function()
{
	
}



