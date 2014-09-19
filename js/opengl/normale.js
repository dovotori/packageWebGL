
function Normale()
{
	this.points = null;
	this.nbFaces = 0;
	this.nbPoints = 0;
	this.nbCoor = 0;
	this.nbVertices = 0;
	this.normalesParFace = null;
	this.normalesParPoints = null;
	this.id = null;
	this.sens = false;
}



Normale.prototype.setup = function(points, nbFaces, idVertices, nbPoints)
{
	this.points = points;
	this.nbFaces = nbFaces;
	this.nbPoints = nbPoints;				// nb de points de l'objet 
	this.nbVertices = nbFaces * 3;	// nb de points pour dessiner l'objet
	this.nbCoor = nbFaces * 3 * 3;	// nb de x/y/z pour dessiner l'objet
	this.id = idVertices;

	this.calculerNormalesParFace();
	this.calculerNormalesParPoint();
}



Normale.prototype.calculerNormalesParFace = function()
{
	var cpt = 0;
	this.normalesParFace = new Array(this.nbFaces);
	for(var i = 0; i < this.nbFaces; i++)
		this.normalesParFace[i] = new Vecteur3D();

	for(var i = 0; i < this.nbCoor; i += 9)
	{
		var p1 = new Vecteur3D(this.points[i], this.points[i+1], this.points[i+2]);
		var p2 = new Vecteur3D(this.points[i+3], this.points[i+4], this.points[i+5]);
		var p3 = new Vecteur3D(this.points[i+6], this.points[i+7], this.points[i+8]);
		this.normalesParFace[cpt] = this.calculerNormaleFace(p1, p2, p3);
		cpt++;
	}
}



Normale.prototype.calculerNormaleFace = function(p1, p2, p3)
{
	var v1 = new Vecteur3D();
	var v2 = new Vecteur3D();
	var normale = new Vecteur3D();
	
	v1 = p1.moins(p2);
	v2 = p2.moins(p3);
	if(this.sens)
		normale = v2.produitVectoriel(v1);
	else
		normale = v1.produitVectoriel(v2);

	normale.normaliser();
	return normale;
}


Normale.prototype.calculerNormalesParPoint = function()
{
	this.normalesParPoint = new Array(this.nbPoints);
	for(var i = 0; i < this.nbPoints; i++)
		this.normalesParPoint[i] = new Vecteur3D();

	var face = 0;
	for(var i = 0; i < this.nbVertices; i++)
	{
		face = Math.floor(i/3);
		this.normalesParPoint[this.id[i]].x += this.normalesParFace[face].x;
		this.normalesParPoint[this.id[i]].y += this.normalesParFace[face].y;
		this.normalesParPoint[this.id[i]].z += this.normalesParFace[face].z;
	}
	
	for(var i = 0; i < this.nbPoints; i++){
		this.normalesParPoint[i].normaliser();
	}	
}



Normale.prototype.get = function()
{
	var normales = new Array(this.nbCoor);
	for(var i = 0; i < this.nbVertices; i++)
	{
		var face = Math.floor(i/3);
		normales[i*3] 		= this.normalesParFace[face].x;
		normales[(i*3)+1] = this.normalesParFace[face].y;
		normales[(i*3)+2] = this.normalesParFace[face].z;
	}
	return normales;
}




Normale.prototype.getSmooth = function()
{
	var normales = new Array(this.nbCoor);
	for(var i = 0; i < this.nbVertices; i++)
	{
		normales[i*3] 		= this.normalesParPoint[this.id[i]].x;
		normales[(i*3)+1] = this.normalesParPoint[this.id[i]].y;
		normales[(i*3)+2] = this.normalesParPoint[this.id[i]].z;
		//alert("id: "+this.id[i]+" normale: "+this.normalesParPoint[this.id[i]].x
				//+" "+this.normalesParPoint[this.id[i]].y
				//+" "+this.normalesParPoint[this.id[i]].z);
	}
	return normales;
}



Normale.prototype.inverser = function(){ this.sens = !this.sens; }

