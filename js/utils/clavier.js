function Clavier()
{
  // code ascii 127
  // a = 65
  this.touches = new Array(127);
  this.souris = new Array(3);
  this.setup();
}


Clavier.prototype.setup = function()
{
  for(var i = 0; i < this.touches.length; i ++)
  {
    this.touches[i] = false;
  }
  for(var i = 0; i < this.souris.length; i ++)
  {
    this.souris[i] = false;
  }
  var clone = this;
  document.addEventListener("keydown", function(e){ clone.update(e); }, false);
  document.addEventListener("keyup", function(e){ clone.update(e); }, false);
  document.addEventListener("mousedown", function(e){ clone.update(e); }, false);
  document.addEventListener("mouseup", function(e){ clone.update(e); }, false);
}


Clavier.prototype.update = function(e)
{
  alert(e.keyCode);
  if(e.type == "keydown")
  {
    this.touches[e.keyCode] = true;
  } else if(e.type == "keyup"){
    this.touches[e.keyCode] = false;
  }
  if(e.type == "mousedown")
  {
    this.souris[e.button] = true;
  } else if(e.type == "mouseup"){
    this.souris[e.button] = false;
  }
}



Clavier.prototype.getClavier = function(code)
{
  return this.touches[code];
}

Clavier.prototype.setClavier = function(code)
{
  this.touches[code] = false;
}

Clavier.prototype.getSouris = function(code)
{
  return this.souris[code];
}



