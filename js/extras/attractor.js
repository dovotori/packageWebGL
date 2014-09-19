
function Attractor()
{

	this.position = new Vecteur(0, 0, 0);
	this.vitesse = new Vecteur(1, 1, 1);
	this.radius = 100.0;		// rayon d'action
    this.strength = -10.0;		// positive attraction, negative repulsion
    this.ramp = 1.0;			// force elastique 0.01 - 0.99
}




Attractor.prototype.update = function()
{
	if(this.position.x < 0 || this.position.x > width){
		this.vitesse.x *= -1;
	}
	if(this.position.y < 0 || this.position.y > height){
		this.vitesse.y *= -1;
	}
	this.position.x += this.vitesse.x;
	this.position.y += this.vitesse.y;
}


Attractor.prototype.draw = function() 
{
	context.fillStyle = "#ff0000";
    context.fillRect(this.position.x, this.position.y, 2, 2);  
}




Attractor.prototype.attract = function(node)
{

	var dx = this.position.x - node.position.x;
    var dy = this.position.y - node.position.y;
    var dz = this.position.z - node.position.z;
    var distance = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));

    if(distance > 0 && distance < this.radius)
    {
        var s = distance / this.radius;
        var force = 1 / Math.pow(s, (0.5 * this.ramp)) - 1;
        force = this.strength * force / this.radius;

        node.velocity.x += dx * force;
        node.velocity.y += dy * force;
        node.velocity.z += dz * force;
    }

}



Attractor.prototype.setPosition = function(x, y, z)
{
	this.position.set(x, y, z);
}


