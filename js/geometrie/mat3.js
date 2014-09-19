
function mat3()
{
  this.d = new Float32Array(9);
  this.sauvegardePrecedente;
  this.empilement;
  
	this.init();
}

mat3.prototype.init = function()
{
  for(var i = 0; i < 9; i++)
  {
    this.d[i] = 0.0;
  } 
  this.sauvegardePrecedente = new Array();
  this.empilement = 0;
}


mat3.prototype.get = function()
{
  return this.d;
}


mat3.prototype.set = function(a1, a2, a3, b1, b2, b3, c1, c2, c3)
{
  this.d[0] = a1; 
  this.d[1] = a2; 
  this.d[2] = a3; 
  
  this.d[3] = b1; 
  this.d[4] = b2; 
  this.d[5] = b3; 
  
  this.d[6] = c1; 
  this.d[7] = c2; 
  this.d[8] = c3; 
}



mat3.prototype.set = function(valeur)
{
	for(var i = 0; i < 9; i++)
  	this.d[i] = valeur[i]; 
}







mat3.prototype.display = function()
{
  alert("m: \n"+
    this.d[0]+" "+this.d[1]+" "+this.d[2]+"\n"+
    this.d[3]+" "+this.d[4]+" "+this.d[5]+"\n"+
    this.d[6]+" "+this.d[7]+" "+this.d[8]
  );
}



//////////////////////////////////////////////////////////
//////////////////////OPERATIONS//////////////////////
//////////////////////////////////////////////////////////

mat3.prototype.multiplier = function(matrice2)
{
  var resultat = new mat3();
  for(var k = 0; k < 3; k++)
  {
    for(var j = 0; j < 3; j++)
    {
      for(var i = 0; i < 3; i++)
      {
				resultat.d[3*j+k] += this.d[3*j+i] * matrice2.d[3*i+k];
      }
    }
  }

  for(var i = 0; i < 9; i++)
  {
    this.d[i] = resultat.d[i];
  }
}


mat3.prototype.egale = function(matrice2) 
{
  for(var i = 0; i < 9; i++)
  {
    this.d[i] = matrice2.d[i];
    this.sauvegardePrecedente[i] = matrice2.sauvegardePrecedente[i];
  }
  
}


//////////////////////////////////////////////////////////
////////////////////// IMBRICATION //////////////////////
//////////////////////////////////////////////////////////

mat3.prototype.push = function()
{
  this.empilement++;
  var cpt = 0;
  for(var i = (this.empilement-1)*9; i < this.empilement*9; i++)
  {
    this.sauvegardePrecedente[i] = this.d[cpt];
    cpt++;
  }
}


mat3.prototype.pop = function()
{
  if(this.empilement > 0)
  {
    var cpt = 0;
    for(var i = (this.empilement-1)*9; i < this.empilement*9; i++)
    {
      this.d[cpt] = this.sauvegardePrecedente[i];
      this.sauvegardePrecedente[i] = null;
      cpt++;
    }
    this.empilement--;
  } else {
    alert("pop de trop");
  }
}





/////////////////////////////////////////////////////////
//////////////////////MODIFICATIONS//////////////////////
//////////////////////////////////////////////////////////

mat3.prototype.identity = function()
{
  this.init();
  this.d[0] = 1.0;
  this.d[4] = 1.0;
  this.d[8] = 1.0;
}




mat3.prototype.transpose = function()
{
  var ordre = new Float32Array(9);
  for(var j = 0; j < 3; j++)
  {
    for(var i = 0; i < 3; i++)
    {
      ordre[3*i+j] = this.d[3*j+i];
    }
  }

  return ordre;
}



mat3.prototype.inverser = function()
{
	var copie = new Array(9);
	var det = this.getDeterminant();

	if(Math.abs(det) < 0.0005)
	{
		this.identity();
		alert("Inversement impossible de la matrice");
		return;
	}

	copie[0] = this.d[4] * this.d[8] - this.d[5] * this.d[7] / det;
	copie[1] = -(this.d[1] * this.d[8] - this.d[7] * this.d[2]) / det;
	copie[2] = this.d[1] * this.d[5] - this.d[4] * this.d[2] / det;
	
	copie[3] = -(this.d[3] * this.d[8] - this.d[5] * this.d[6]) / det;
	copie[4] = this.d[0] * this.d[8] - this.d[6] * this.d[2] / det;
	copie[5] = -(this.d[0] * this.d[5] - this.d[3] * this.d[2]) / det;
	
	copie[6] = this.d[3] * this.d[7] - this.d[6] * this.d[4] / det;
	copie[7] = -(this.d[0] * this.d[7] - this.d[6] * this.d[1]) / det;
	copie[8] = this.d[0] * this.d[4] - this.d[1] * this.d[3] / det;

	for(var i = 0; i < 9; i++)
		this.d[i] = copie[i];
}


mat3.prototype.getDeterminant = function()
{
	return this.d[0] * (this.d[4] * this.d[8] - this.d[7] * this.d[5])
		+ this.d[1] * (this.d[5] * this.d[6] - this.d[3] * this.d[8])
		+ this.d[2] * (this.d[3] * this.d[7] - this.d[6] * this.d[4]);
}





