
var canvas; var gl;
var context;
var debug;
var lastFrame;

window.addEventListener("load", setup, false);




function setup()
{

  try 
  {
    debug = document.getElementById("debug");
    canvas = document.getElementsByTagName("canvas")[0];
    gl = canvas.getContext("experimental-webgl");
  } catch (err) 
  {
    alert("Votre navigateur ne supporte pas WebGL");
  }

  if(gl != null){
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);

    dessin = new Dessin();
    dessin.setup();

    lastFrame = new Date().getTime();

    window.requestAnimationFrame(draw);
  }
  
}





function draw() 
{

  try 
  {

    var now = new Date().getTime();
    var milli = now - lastFrame;
    var fps = 1000/50;


    if(milli > fps){

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      dessin.draw();
      
      lastFrame = now;  
    } 
  
    window.requestAnimationFrame(draw);

  } catch (e) {
    alert("Error: "+e);
  }
}





