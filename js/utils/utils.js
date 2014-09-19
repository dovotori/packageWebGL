


window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback, element){
              window.setTimeout(callback, 1000 / 50);
            };
})();


function loadFile(url, callback)
{
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('text/plain');
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4) {
      var data = xobj.responseText;
      callback(data);
    }
  };
  xobj.send(null);
}



function loadJson(url, callback){
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4) {
			var json = xobj.responseText;
			callback(eval(json)[0]);
		}
    };
    xobj.send(null);
}



function loadCsv(url, delimeter, callback){

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType('text/plain');
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4) {
			var strData = xobj.responseText;
			strData = strData.replace(/ /g, ''); 
			var data = parseCsv(strData, delimeter);
			callback(data);
		}
    };
    xobj.send(null);
}



function parseCsv(strData, delimeter){
	delimeter = (delimeter || ",");

    var objPattern = new RegExp(
        (
        	// delimeter
            "(\\" + delimeter + "|\\r?\\n|\\r|^)" +

            // champ ""
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // champ
            "([^\"\\" + delimeter + "\\r\\n]*))"
        ),
        "gi"
    );

    var data = [[]];
    var arrMatches = null;

    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];

        if (strMatchedDelimiter.length && strMatchedDelimiter !== delimeter){
            data.push( [] );
        }

        var strMatchedValue;

        if (arrMatches[ 2 ]){
        	// champ string trouvé
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ), "\"");
        } else {
            // champ normal trouvé
            strMatchedValue = arrMatches[ 3 ];
        }
        data[ data.length - 1 ].push( strMatchedValue );
    }
    return(data);
}




function disableEventChildren(event, elem){
    var list = traverseChildren(elem);
    var e = event.toElement || event.relatedTarget;
    if (!!~list.indexOf(e)) {
        return false;
    }
    return true;
}



// quick and dirty DFS children traversal
function traverseChildren(elem){
    var children = [];
    var q = [];
    q.push(elem);
    while (q.length > 0) {
      var elem = q.pop();
      children.push(elem);
      pushAll(elem.children);
    }
    function pushAll(elemArray){
      for(var i=0; i < elemArray.length; i++) {
        q.push(elemArray[i]);
      }
    }
    return children;
}






function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
 
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // #f09 version 3 chiffres marche aussi
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function random(min, max) 
{
    return Math.random() * (max - min) + min;
}


function map(valeur, minRef, maxRef, minDest, maxDest) {
  return minDest + (valeur - minRef) * (maxDest - minDest) / (maxRef - minRef);
}


function signe(valeur)
{
  if(valeur == 0)
    return 0;
  else if(valeur > 0)
    return 1;
  else
    return -1;
}


function lerp(t, a, b){
    return (1-t)*a + t*b;
}


function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



function quelOs(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	return OSName;
}


// ///////////////////// NOISE /////////////////////////////

function noise(x, y, z) 
{
	var p = new Array(512)
	var permutation = [ 151,160,137,91,90,15,
	131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
	190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
	88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
	77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
	102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
	135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
	5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
	223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
	129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
	251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
	49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
	138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
	];
	
	for (var i=0; i < 256 ; i++) 
		p[256+i] = p[i] = permutation[i]; 

	var X = Math.floor(x) & 255,  // FIND UNIT CUBE THAT
	Y = Math.floor(y) & 255,      // CONTAINS POINT.
	Z = Math.floor(z) & 255;
	x -= Math.floor(x);        		// FIND RELATIVE X,Y,Z
	y -= Math.floor(y);        		// OF POINT IN CUBE.
	z -= Math.floor(z);
	
	var    u = fade(x),        		// COMPUTE FADE CURVES
	v = fade(y),               		// FOR EACH OF X,Y,Z.
	w = fade(z);
	
	var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,     // HASH COORDINATES OF
	B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      		// THE 8 CUBE CORNERS,

	return lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ), // AND ADD
	grad(p[BA  ], x-1, y  , z   )), 																		// BLENDED
	lerp(u, grad(p[AB  ], x  , y-1, z   ),  														// RESULTS
	grad(p[BB  ], x-1, y-1, z   ))),																		// FROM  8
	lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  										// CORNERS
	grad(p[BA+1], x-1, y  , z-1 )), 																		// OF CUBE
	lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
	grad(p[BB+1], x-1, y-1, z-1 ))));
}

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }


function grad(hash, x, y, z) 
{
	var h = hash & 15;        // CONVERT LO 4 BITS OF HASH CODE
	var u = h<8 ? x : y,      // INTO 12 GRADIENT DIRECTIONS.
	v = h<4 ? y : h==12||h==14 ? x : z;
	return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
} 

function scale(n) { return (1 + n)/2; } // SCALE TO 0 TO 1 








//////////////////////////
//////////////////////////



var Transition = function()
{

	this.cpt = 0;
	this.isFinished = true;
	this.duration = 0;
	this.mode = linearTween;

	this.origine = 0;
	this.destination = 1;

	this.onComplete = null;


	this.setup = function(origine, destination, duration, mode){
		
		this.isFinished = false;
		this.cpt = 0;
		this.onComplete = null;

		if(mode != null){ this.mode = mode; } else { this.mode = linearTween; }
		if(origine != null){ this.origine = origine; } else { this.origine = 0; }
		if(destination != null){ this.destination = destination; } else { destination = 1; }
		if(duration != null){ this.duration = duration; } else { this.duration = 1; }


	}


	this.execute = function()
	{
		if(!this.isFinished)
		{		
			if(this.cpt > this.duration) {
				this.isFinished = true;
				if(this.onComplete != null){
					this.onComplete();
					this.onComplete = null;
				}
				return this.destination;
			} else {	
				this.cpt++;
				var currentPosition = this.origine;
				currentPosition = this.mode(this.cpt, this.origine, (this.destination-this.origine), this.duration);
				return currentPosition;
			}
		} else {
			return this.destination;
		}
	}
}




function linearTween(t, b, c, d) {
	return c*t/d+b;
}

function easeInQuad(t, b, c, d) {
	return c*(t/=d)*t + b;
}

function easeOutQuad(t, b, c, d) {
	return -c *(t/=d)*(t-2) + b;
}

function easeInOutQuad(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

function easeInCubic(t, b, c, d) {
	return c*(t/=d)*t*t + b;
}

function easeOutCubic(t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

function easeInQuart(t, b, c, d) {
	return c*(t/=d)*t*t*t + b;
}

function easeOutQuart(t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
}

function easeInQuint(t, b, c, d) {
	return c*(t/=d)*t*t*t*t + b;
}

function easeOutQuint(t, b, c, d) {
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
}

function easeInSine(t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}

function easeOutSine(t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
}

function easeInOutSine(t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

function easeInExpo(t, b, c, d) {
	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

function easeInCirc(t, b, c, d) {
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}

function easeOutCirc(t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
}

function easeInOutCirc(t, b, c, d) {
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}

function easeInElastic(t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}

function easeOutElastic(t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t==0) return b; if ((t/=d)==1) return b+c; if (!p) p=d*.3;
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}

function easeInOutElastic(t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t==0) return b; if ((t/=d/2)==2) return b+c; if (!p) p=d*(.3*1.5);
	if (a < Math.abs(c)) { a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}

function easeInBack(t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
}

function easeOutBack(t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

function easeOutBounce(t, b, c, d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}
	

