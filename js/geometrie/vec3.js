
function vec3(x, y, z)
{
  this.x = this.y = this.z = 0;;
  if(x || y || z)
  {
    this.x = x;
    this.y = y;
    this.z = z;
  } 
}


vec3.prototype.normaliser = function()
{
  var longueur = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));

  if(longueur != 0.0)
  {
    this.x /= longueur;
    this.y /= longueur;
    this.z /= longueur;
  }
}


vec3.prototype.display = function()
{
  alert(
    "v: "+this.x+" "+this.y+" "+this.z
  );
}


vec3.prototype.produitVectoriel = function(vecteur2)
{
	var resultat = new vec3();
  resultat.x = this.y * vecteur2.z - this.z * vecteur2.y;
  resultat.y = this.z * vecteur2.x - this.x * vecteur2.z;
  resultat.z = this.x * vecteur2.y - this.y * vecteur2.x;
	return resultat;
}


vec3.prototype.produitScalaire = function(vecteur1, vecteur2)
{
  return vecteur1.x * vecteur2.x + vecteur1.y * vecteur2.y + vecteur1.z * vecteur2.z;
}


vec3.prototype.get = function()
{
	var valeurs = new Array(3);
	valeurs[0] = this.x;
	valeurs[1] = this.y;
	valeurs[2] = this.z;
	return valeurs;
}


vec3.prototype.longueur = function()
{
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) 
	+ Math.pow(this.z, 2));
}





/* //////////////////// OPERATOR /////////////////////// */

vec3.prototype.set = function(x, y, z)
{
  this.x = x;
  this.y = y;
  this.z = z;
}


vec3.prototype.egale = function(v)
{
  this.x = v.x;
  this.y = v.y;
  this.z = v.z;
}



vec3.prototype.plus = function(v)
{
	var resultat = new vec3();
  resultat.x = this.x + v.x;
  resultat.y = this.y + v.y;
  resultat.z = this.z + v.z;
	return resultat;
}


vec3.prototype.moins = function(v)
{
	var resultat = new vec3();
  resultat.x = this.x - v.x;
  resultat.y = this.y - v.y;
  resultat.z = this.z - v.z;
	return resultat;
}


vec3.prototype.multiplier = function(v)
{
	var resultat = new vec3();
  resultat.x = this.x * v.x;
  resultat.y = this.y * v.y;
  resultat.z = this.z * v.z;
	return resultat;
}


vec3.prototype.diviser = function(v)
{
	var resultat = new vec3();
  resultat.x = this.x / v.x;
  resultat.y = this.y / v.y;
  resultat.z = this.z / v.z;
	return resultat;
}









