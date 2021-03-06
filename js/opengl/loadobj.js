

function LoadObj(source)
{
  this.nbV = 0;
  this.nbI = 0;
  this.nbN = 0;
  this.nbT = 0;
  this.vertices = new Array;
  this.normales = new Array;
  this.textures = new Array;
  this.indicesV = new Array;
  this.indicesT = new Array;
  this.indicesN = new Array;
  this.type = 0;  // 0 V // 1 VT // 2 VN // 3 VTN

  this.traitement(source);
}

LoadObj.prototype.traitement = function(source)
{
  var mots = source.replace(/\n/g, ' ').split(' ');
  
  this.compter(mots);
  this.affecter(mots);
}



LoadObj.prototype.compter = function(mots)
{
  for(var i = 0; i < mots.length; i++)
  {
    if(mots[i] == "v")
    {
      this.nbV++;
    } else if(mots[i] == "f")
    {
      this.nbI++;
    } else if(mots[i] == "vn")
    {
      this.nbN++;
    } else if(mots[i] == "vt")
    {
      this.nbT++;
    }
  }

  // type de face
  if(this.nbN > 0 && this.nbT > 0)
    this.type = 3;
  else if(this.nbN > 0)
    this.type = 2;
  else if(this.nbT > 0)
    this.type = 1;
  else
    this.type = 0;
}


LoadObj.prototype.affecter = function(mots)
{
  var cptV = 0;
  var cptI = 0;
  var cptT = 0;
  var cptN = 0;

  for(var i = 0; i < mots.length; i++)
  {
    if(mots[i] == "v")
    {
      for(var j = 1; j < 4; j++)
      {
	this.vertices[cptV] = parseFloat(mots[i+j]);
	cptV++;
      }
    } else if(mots[i] == "vn")
    {
      for(var j = 1; j < 4; j++)
      {
	this.normales[cptN] = parseFloat(mots[i+j]);
	cptN++;
      }
    } else if(mots[i] == "vt")
    {
      for(var j = 1; j < 3; j++)
      {
	this.textures[cptT] = parseFloat(mots[i+j]);
	cptT++;
      }
    } else if(mots[i] == "f")
    {
      var cpt = 0;
      for(j = 1; j < 4; j++)
      {
	var ligne = this.traiterFace(mots[i+j]);
	this.indicesV[cptI] = parseInt(ligne[0]);
	if(this.type == 3)
	{
	  this.indicesT[cptI] = parseInt(ligne[1]);
	  this.indicesN[cptI] = parseInt(ligne[2]);
	}
	else if(this.type == 2)
	{
	  this.indicesN[cptI] = parseInt(ligne[2]);
	}
	else if(this.type == 1)
	{
	  this.indicesT[cptI] = parseInt(ligne[1]);
	}
	cptI++;
      }
    }
  }

  // indices - 1
  for(var i = 0; i < this.nbI * 3; i++)
  {
    this.indicesV[i]--;
    this.indicesN[i]--;
    this.indicesT[i]--;
  }
}


LoadObj.prototype.traiterFace = function(ligne)
{
  var resultat;
  if(ligne.indexOf("//") > -1)
  {
    resultat = ligne.replace("//", " 1 ");
  } else if (ligne.indexOf("/") > -1){
    resultat = ligne.replace(/\//gi, " ");
  }
  
  resultat = resultat.split(' ');
  return resultat;
}


LoadObj.prototype.getVertices = function()
{
  var resultat = new Array(this.nbI * 3 * 3);
  var cpt = 0;
  for(var i = 0; i < resultat.length; i += 3)
  {
    resultat[i] = this.vertices[this.indicesV[cpt]*3];
    resultat[i+1] = this.vertices[this.indicesV[cpt]*3+1];
    resultat[i+2] = this.vertices[this.indicesV[cpt]*3+2];
    //alert(resultat[i]+" "+resultat[i+1]+" "+resultat[i+2]);
    cpt++;
  }

  return resultat;
}


LoadObj.prototype.getNormales = function()
{
  var resultat = new Array(this.nbI * 3 * 3);
  var cpt = 0;
  for(var i = 0; i < resultat.length; i += 3)
  {
    resultat[i] = this.normales[this.indicesN[cpt]*3];
    resultat[i+1] = this.normales[this.indicesN[cpt]*3+1];
    resultat[i+2] = this.normales[this.indicesN[cpt]*3+2];
    //alert(resultat[i]+" "+resultat[i+1]+" "+resultat[i+2]);
    cpt++;
  }

  return resultat;
}


LoadObj.prototype.getTextures = function()
{
  var resultat = new Array(this.nbI * 3 * 2);
  var cpt = 0;
  for(var i = 0; i < resultat.length; i += 2)
  {
    resultat[i] = this.textures[this.indicesT[cpt]*2];
    resultat[i+1] = this.textures[this.indicesT[cpt]*2+1];
    //alert(resultat[i]+" "+resultat[i+1]);
    cpt++;
  }
  return resultat;
}


LoadObj.prototype.getNbFaces = function(){ return  this.nbI; }
LoadObj.prototype.getType = function(){ return  this.type; }
LoadObj.prototype.getIdVertices = function(){ return this.indicesV; }
LoadObj.prototype.getNbPoints = function(){ return this.nbV; }

