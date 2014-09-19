
function Heightmap()
{
	this.dimensions = new Array(2);
	this.dimensions[0] = 10; this.dimensions[1] = 10;
	this.unite = new Array(2);
	this.unite[0] = 1; this.unite[1] = 1;
	
	this.points = null;
	this.vertices = null;
	this.id = null;
	this.nbPoints = 0;
	this.nbFaces = 0;
	this.cpt = 0;
}


Heightmap.prototype.setup = function()
{
	this.nbPoints = this.dimensions[0] * this.dimensions[1];
	this.points = new Array(this.nbPoints);

	var cpt = 0;
	for(var z = -this.dimensions[1]/2; z < this.dimensions[1]/2; z++)
	{
		for(var x = -this.dimensions[0]/2; x < this.dimensions[0]/2; x++)
		{
			this.points[cpt] = new Vecteur3D();
			this.points[cpt].x = x * this.unite[0];
			this.points[cpt].y = 0.0;
			this.points[cpt].z = z * this.unite[1];
			cpt++;
		}
	}
	this.calculerCoor();
}



Heightmap.prototype.calculerCoor = function()
{
	this.nbFaces = (this.dimensions[0]-1) * (this.dimensions[1]-1) * 2;
	this.vertices = new Array(this.nbFaces * 3 * 3);
	this.id = new Array(this.nbFaces * 3);
	
	var cpt = 0; var cptId = 0; var pt = 0;
	for(var z = 0; z < this.dimensions[1]-1; z++)
	{
		for(var x = 0; x < this.dimensions[0]-1; x++)
		{
			var coinHG = new Vecteur3D();
			var coinBG = new Vecteur3D();
			var coinHD = new Vecteur3D();
			var coinBD = new Vecteur3D();

			coinHG = this.points[pt];
			coinHD = this.points[pt+1];
			coinBG = this.points[pt+this.dimensions[0]];
			coinBD = this.points[pt+this.dimensions[0]+1];

			// id
			this.id[cptId] = pt;
			this.id[cptId+1] = pt+1;
			this.id[cptId+2] = pt+this.dimensions[0];
			this.id[cptId+3] = pt+1;
			this.id[cptId+4] = pt+this.dimensions[0]+1;
			this.id[cptId+5] = pt+this.dimensions[0];

			// premier triangle
			this.vertices[cpt+0] = coinHG.x;
			this.vertices[cpt+1] = coinHG.y;
			this.vertices[cpt+2] = coinHG.z;
			
			this.vertices[cpt+3] = coinHD.x;
			this.vertices[cpt+4] = coinHD.y;
			this.vertices[cpt+5] = coinHD.z;
			
			this.vertices[cpt+6] = coinBG.x;
			this.vertices[cpt+7] = coinBG.y;
			this.vertices[cpt+8] = coinBG.z;
			
			// deuxieme triangle
			this.vertices[cpt+9] = coinHD.x;
			this.vertices[cpt+10] = coinHD.y;
			this.vertices[cpt+11] = coinHD.z;
			
			this.vertices[cpt+12] = coinBD.x;
			this.vertices[cpt+13] = coinBD.y;
			this.vertices[cpt+14] = coinBD.z;
			
			this.vertices[cpt+15] = coinBG.x;
			this.vertices[cpt+16] = coinBG.y;
			this.vertices[cpt+17] = coinBG.z;

			cpt += 18;
			cptId += 6;
			pt++;
		}
		pt++;
	}
}




Heightmap.prototype.getVertices = function(){ return this.vertices; }
Heightmap.prototype.getIdVertices = function(){ return this.id; }
Heightmap.prototype.getNbFaces = function(){ return this.nbFaces; }
Heightmap.prototype.getNbPoints = function(){ return this.nbPoints; }

Heightmap.prototype.setDimensions = function(x, y)
	{ this.dimensions[0] = x; this.dimensions[1] = y; }
Heightmap.prototype.setUnite = function(x, y)
	{ this.unite[0] = x; this.unite[1] = y; }



