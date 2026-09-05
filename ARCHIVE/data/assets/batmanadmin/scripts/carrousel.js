var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var fadebgcolor	= "black";
var fadearray	= new Array(); //array to cache fadeshow instances
var fadeclear	= new Array(); //array to cache corresponding clearinterval pointers
 var fadeTimer = 0;
var dom			= (document.getElementById);
var iebrowser	= document.all;
 
function fadeshow(theimages, fadewidth, fadeheight, borderwidth, delay, pause, displayorder) {
	if (theimages) {
		this.pausecheck = pause;
		this.mouseovercheck = 0;
		this.delay = delay;
		this.degree = 10; //initial opacity degree (10%)
		this.curimageindex = 0;
		this.nextimageindex = 1;
		fadearray[fadearray.length] = this;
		this.slideshowid = fadearray.length-1;
		this.canvasbase = "canvas"+this.slideshowid;
		this.curcanvas = this.canvasbase+"_0";
		if (typeof displayorder != "undefined") {
			theimages.sort(function() {return 0.5 - Math.random();}); //thanks to Mike (aka Mwinter) :)
		}
		this.theimages = theimages;
		this.imageborder = parseInt(borderwidth);
		this.postimages = new Array(); //preload images
		this.linkimages = new Array(); //preload images
		for (p=0; p<theimages.length; p++) {
			// main images
			this.postimages[p] = new Image();
			this.postimages[p].src = theimages[p][0];
			
			// thumb
			this.linkimages[p] = new Image();
			this.linkimages[p].src = theimages[p][1];
		}
		 
		var fadewidth = fadewidth+this.imageborder*2;
		var fadeheight = fadeheight+this.imageborder*2;
		 
		if (((iebrowser) && (dom)) || (dom)) {
			//if IE5+ or modern browsers (ie: Firefox)
			//document.write('<div id="master'+this.slideshowid+'" style="position:relative;width:'+fadewidth+'px;height:'+fadeheight+'px;overflow:hidden;"><div id="'+this.canvasbase+'_0" style="position:absolute;width:'+fadewidth+'px;height:'+fadeheight+'px;top:0;left:0;filter:progid:DXImageTransform.Microsoft.alpha(opacity=10);opacity:0.1;-moz-opacity:0.1;-khtml-opacity:0.1;background-color:'+fadebgcolor+'"></div><div id="'+this.canvasbase+'_1" style="position:absolute;width:'+fadewidth+'px;height:'+fadeheight+'px;top:0;left:0;filter:progid:DXImageTransform.Microsoft.alpha(opacity=10);opacity:0.1;-moz-opacity:0.1;-khtml-opacity:0.1;background-color:'+fadebgcolor+'"></div></div>')
			MCarrousel = document.getElementById("Carrousel");
			Holder = document.createElement("div");
			Nav = document.createElement("div");
			Nav.id = "CarrouselNav";
			Nav.style.zIndex = "10000";
			Holder.cssName = "Carrousel";
			MCarrousel.appendChild(Holder);
			MCarrousel.appendChild(Nav);
			NavText = "";
			NavText += "<ul>\n";
			
			for (var i=0; i<theimages.length; i++) {
				NavText += "<li><img onclick=\"javascript:pushIn(fadearray["+this.slideshowid+"],'" + i + "')\" src=\""+this.linkimages[i].src+"\"></li>\n";
			}
			NavText += "</ul>\n";
			
			Holder.innerHTML = '<div id="master'+this.slideshowid+'" style="position:relative;width:'+fadewidth+'px;height:'+fadeheight+'px;overflow:hidden;"><div id="'+this.canvasbase+'_0" style="position:absolute;width:'+fadewidth+'px;height:'+fadeheight+'px;top:0;left:0;filter:progid:DXImageTransform.Microsoft.alpha(opacity=10);opacity:0.1;-moz-opacity:0.1;-khtml-opacity:0.1;background-color:'+fadebgcolor+'"></div><div id="'+this.canvasbase+'_1" style="position:absolute;width:'+fadewidth+'px;height:'+fadeheight+'px;top:0;left:0;filter:progid:DXImageTransform.Microsoft.alpha(opacity=10);opacity:0.1;-moz-opacity:0.1;-khtml-opacity:0.1;background-color:'+fadebgcolor+'"></div></div>';
			Nav.innerHTML = NavText;
		}
		else {
			//document.write('<div><img name="defaultslide'+this.slideshowid+'" src="'+this.postimages[0].src+'"></div>')
			document.getElementById("Carrousel").innerHTML = '<div><img) name="defaultslide'+this.slideshowid+'" src="'+this.postimages[0].src+'"></div>';
		}
		
		if (((iebrowser) && (dom)) || (dom)) {
			this.startit();
		}
		
		else {
			this.curimageindex++;
			setInterval("fadearray["+this.slideshowid+"].rotateimage()", this.delay);
		}
	}
}

function pushIn(obj,imgNumber) {
	//clearInterval(fadeclear[obj.slideshowid]);
	clearInterval(fadeTimer);
	obj.nextimageindex = imgNumber;
	obj.nextcanvas=(obj.curcanvas==obj.canvasbase+"_0") ? obj.canvasbase+"_0" : obj.canvasbase+"_1";
	obj.tempobj=iebrowser? iebrowser[obj.nextcanvas] : document.getElementById(obj.nextcanvas);
	obj.populateslide(obj.tempobj, obj.nextimageindex);
	obj.nextimageindex=(obj.nextimageindex<obj.postimages.length-1)? parseInt(obj.nextimageindex)+1 : 0;
	fadeTimer = setTimeout("fadearray["+obj.slideshowid+"].rotateimage()", this.delay);
	//setTimeout("fadearray["+obj.slideshowid+"].rotateimage()", this.delay);
}

function fadepic(obj) {
	if (obj.degree<100) {
		obj.degree += 10;
		if ((obj.tempobj.filters) && (obj.tempobj.filters[0])) {
			if (typeof obj.tempobj.filters[0].opacity == "number") {
				obj.tempobj.filters[0].opacity = obj.degree;
			}
			else {
				obj.tempobj.style.filter = "alpha(opacity=" + obj.degree + ")";
			}
		}
		else if (obj.tempobj.style.MozOpacity) {
			obj.tempobj.style.MozOpacity = obj.degree / 101;
		}
		else if (obj.tempobj.style.KhtmlOpacity) {
			obj.tempobj.style.KhtmlOpacity = obj.degree / 100;
		}
		else if (obj.tempobj.style.opacity&&!obj.tempobj.filters) {
			obj.tempobj.style.opacity = obj.degree / 101;
		}
	}
	else {
		clearInterval(fadeTimer);
		//clearInterval(fadeclear[obj.slideshowid]);
		obj.nextcanvas=(obj.curcanvas==obj.canvasbase+"_0")? obj.canvasbase+"_0" : obj.canvasbase+"_1";
		obj.tempobj=iebrowser? iebrowser[obj.nextcanvas] : document.getElementById(obj.nextcanvas);
		obj.populateslide(obj.tempobj, obj.nextimageindex);
		obj.nextimageindex=(obj.nextimageindex<obj.postimages.length-1)? parseInt(obj.nextimageindex)+1 : 0;
		fadeTimer = setTimeout("fadearray["+obj.slideshowid+"].rotateimage()", obj.delay);
	}
}
 
fadeshow.prototype.populateslide = function(picobj, picindex) {
	var slideHTML = "";
	if (this.theimages[picindex][2]!="") {
		slideHTML = '<a href="'+this.theimages[picindex][2]+'" target="'+this.theimages[picindex][3]+'">';
		slideHTML += '<img src="'+this.postimages[picindex].src+'" border="'+this.imageborder+'px">';
	}
	if (this.theimages[picindex][2]!="") {
		slideHTML += "</a>";
		picobj.innerHTML = slideHTML;
	}
}
 
 
fadeshow.prototype.rotateimage = function() {
	if (this.pausecheck==1) {
		var cacheobj=this;
	}
	
	if (this.mouseovercheck==1) {
	setTimeout(function() {cacheobj.rotateimage()}, 100)
	}
	
	else if (((iebrowser) && (dom)) || (dom)) {
		this.resetit()
		var crossobj=this.tempobj=iebrowser? iebrowser[this.curcanvas] : document.getElementById(this.curcanvas)
		crossobj.style.zIndex++
		fadeTimer = setInterval("fadepic(fadearray["+this.slideshowid+"])",50)
		this.curcanvas=(this.curcanvas==this.canvasbase+"_0")? this.canvasbase+"_1" : this.canvasbase+"_0"
	}
	else{
		var ns4imgobj=document.images['defaultslide'+this.slideshowid]
		ns4imgobj.src=this.postimages[this.curimageindex].src
	}
	this.curimageindex=(this.curimageindex<this.postimages.length-1)? parseInt(this.curimageindex)+1 : 0
}
 
fadeshow.prototype.resetit = function() {
	this.degree=10
	var crossobj=iebrowser? iebrowser[this.curcanvas] : document.getElementById(this.curcanvas)
	if (crossobj.filters&&crossobj.filters[0]) {
		if (typeof crossobj.filters[0].opacity=="number") {
			crossobj.filters(0).opacity=this.degree;
		}
		else {
			crossobj.style.filter="alpha(opacity="+this.degree+")";
		}
	}
	else if (crossobj.style.MozOpacity) {
		crossobj.style.MozOpacity=this.degree/101;
	}
	else if (crossobj.style.KhtmlOpacity) {
		crossobj.style.KhtmlOpacity=this.degree/100;
	}
	
	else if (crossobj.style.opacity&&!crossobj.filters) {
		crossobj.style.opacity=this.degree/101;
	}
}
 
 
fadeshow.prototype.startit = function() {
	var crossobj=iebrowser? iebrowser[this.curcanvas] : document.getElementById(this.curcanvas)
	this.populateslide(crossobj, this.curimageindex)
	if (this.pausecheck==1) { //IF SLIDESHOW SHOULD PAUSE ONMOUSEOVER
		var cacheobj=this
		var crossobjcontainer=iebrowser? iebrowser["master"+this.slideshowid] : document.getElementById("master"+this.slideshowid)
		crossobjcontainer.onmouseover = function() {cacheobj.mouseovercheck=1}
		crossobjcontainer.onmouseout = function() {cacheobj.mouseovercheck=0}
	}
	this.rotateimage();
}


}
/*
     FILE ARCHIVED ON 23:07:00 Jun 30, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:59:15 Sep 13, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.resolve: 79.107 (2)
  exclusion.robots: 0.208
  exclusion.robots.policy: 0.192
  RedisCDXSource: 6.396
  esindex: 0.03
  LoadShardBlock: 63.471 (3)
  PetaboxLoader3.datanode: 53.067 (4)
  captures_list: 104.317
  load_resource: 72.479
  CDXLines.iter: 28.102 (3)
*/
