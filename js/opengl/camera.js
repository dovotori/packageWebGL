
function Camera()
{

	this.position = new vec3(0, 0, 40);
	this.cible = new vec3(0, 0, 0);
	
	// MATRICES
	this.view = new mat4();
	this.projection = new mat4();

	// STRAFF
	this.orientation = new vec3();
	this.straf = new vec3();
	this.angleVertical = 0.0;
	this.angleHorizontal = 0.0;
	this.vitesse = 1.0;
	this.sensibilite = 0.1;
	this.altitude = 1.0;
	
}


Camera.prototype.setup = function()
{
	this.view.identity();
	this.projection.identity();
	this.lookAt();
	this.perspective();
}



Camera.prototype.lookAt = function()
{
	this.view.lookAt(
		this.position.x, this.position.y, this.position.z,
		this.cible.x, this.cible.y, this.cible.z,
		0, 1, 0
	);
}


Camera.prototype.perspective = function(){
	this.projection.perspective(50, canvas.width/canvas.height, 1.0, 100.0);
}



Camera.prototype.interaction = function(input)
{
}


Camera.prototype.getPosition = function(){ return this.position; }
Camera.prototype.getCible = function(){ return this.cible; }
Camera.prototype.getView = function(){ return this.view; }
Camera.prototype.getProjection = function(){ return this.projection; }




