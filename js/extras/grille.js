
function Dessin()
{
	this.nbNodes = 30;
    this.distanceInterval = 10;
	this.nodes = new Array(this.nbNodes*this.nbNodes);
	this.attractor = new Attractor();
}




Dessin.prototype.setup = function()
{

	this.reset();
	this.attractor.setPosition(0, 0, 0);
	Node.setBox(0, 0, 0, width, height, 1000);
}




Dessin.prototype.update = function()
{
	this.attractor.update();
	for(var i = 0; i < this.nbNodes*this.nbNodes; i++)
    {
        this.attractor.attract(this.nodes[i]);
        this.nodes[i].update(false, false, true);
    }

}



Dessin.prototype.draw = function()
{
	this.attractor.draw();
	context.fillStyle = "#000000";
	for(var i = 0; i < this.nbNodes*this.nbNodes; i++)
    {
    	this.nodes[i].draw();
	}
}




Dessin.prototype.reset = function()
{

	var cpt = 0;

    for(var y = 0; y < this.nbNodes; y++)
    {
        for(var x = 0; x < this.nbNodes; x++)
        {
            var posX = x * this.distanceInterval;
            var posY = y * this.distanceInterval;
            this.nodes[cpt] = null;
            this.nodes[cpt] = new Node();
            this.nodes[cpt].setPosition(posX, posY, 0);

            cpt ++;
        }
    }

}






