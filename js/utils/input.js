function Input()
{
  // code ascii 127
  // a = 65
  this.touches = new Array(127);
  this.souris = new Array(3);
  this.positionSouris = new Array(2);
  this.setup();
}


Input.prototype.setup = function()
{
  for(var i = 0; i < this.touches.length; i ++)
  {
    this.touches[i] = false;
  }
  for(var i = 0; i < this.souris.length; i ++)
  {
    this.souris[i] = false;
  }
	this.positionSouris[0] = 0;
	this.positionSouris[1] = 0;

  var clone = this;
  document.addEventListener("keydown", function(e){ clone.update(e); }, false);
  document.addEventListener("keyup", function(e){ clone.update(e); }, false);
  document.addEventListener("mousedown", function(e){ clone.update(e); }, false);
  document.addEventListener("mouseup", function(e){ clone.update(e); }, false);
  document.addEventListener("mousemove", function(e){ clone.update(e); }, false);
}


Input.prototype.update = function(e)
{
  //alert(e.keyCode);
  if(e.type == "keydown")
  {
    this.touches[e.keyCode] = true;
  } else if(e.type == "keyup"){
    this.touches[e.keyCode] = false;
  }
  if(e.type == "mousedown")
  {
    this.souris[e.button] = true;
  } else if(e.type == "mouseup")
	{
    this.souris[e.button] = false;
	}
	if(e.type == "mousemove")
	{
		this.positionSouris[0] = e.screenX;
		this.positionSouris[1] = e.screenY;
	}
}



Input.prototype.getClavier = function(code)
{ return this.touches[code]; }

Input.prototype.setClavier = function(code)
{ this.touches[code] = false; }

Input.prototype.getSouris = function(code)
{ return this.souris[code]; }

Input.prototype.getSourisX = function()
{ return this.positionSouris[0]; }

Input.prototype.getSourisY = function()
{ return this.positionSouris[1]; }


