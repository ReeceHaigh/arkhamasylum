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

var podcastArray = "";

function isDefined(property) {
	return (typeof property != 'undefined');
}

if (isDefined(window.addEventListener)) {
	window.addEventListener("load", RunFunctions, false);
}

else if (isDefined(window.attachEvent))	{
	window.attachEvent("onload", RunFunctions);
}

// Targets
function externalLinks() {
	if (!document.getElementsByTagName)
	return;
	
	var anchors = document.getElementsByTagName("a");
	
	for (var i=0;i<anchors.length;i++) { 
		var anchor = anchors[i];
		
		if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") {
			anchor.target = "_blank";
		}
	}
}

function BlurLinks() {
	lnks				= document.getElementsByTagName("a");	
	for(i=0;i<lnks.length;i++) {
		linkhref			= lnks[i].getAttribute("href");
		
		if ((lnks[i].getAttribute("rel") == null) || (lnks[i].getAttribute("rel") == "")) {
			lnks[i].onfocus		= new Function("this.blur()");
		}
}
	
	// Input Buttons
	inpts	= document.getElementsByName("input");
	
	for(i=0;i<inpts.length;i++) {
		inpts[i].onfocus= new Function("this.blur()");
	}

}

function RunFunctions() {
	externalLinks();
	BlurLinks();
	podcasts();
	if (document.getElementById("Header")) {
		var so = new SWFObject(“/arkhamasylum/data/assets/" + BaseURL + "flash/arkham_asylum.swf", "Trailer", "370", "140", "6", "#000000");
		so.addParam("wmode", "transparent");
		so.write("Logo");
	}
	
	if (document.getElementById("Carrousel")) {
		new fadeshow(fadeimages, 700, 394, 0, 8000, 1);	
	}
	
	if (document.getElementById("LoginForm")) {
		document.getElementById("LoginForm").target = "_blank";
	}
}

function podcasts() {
	if (podcastArray) {
		j = 0;
		for (i=0; i<podcastArray.length;i++) {
			j++;
			podHolder	= "Podcast" + j;
			if (document.getElementById(podHolder))	{
				var po = new SWFObject(“/arkhamasylum/data/assets/" + BaseURL + "flash/audioPlayer.swf", "Pod Cast", "630", "40", "6", "#000000");
				po.addParam("wmode", "transparent");
				po.addVariable("MP3Path", “/arkhamasylum/data/assets/" + BaseURL + "audio/" + podcastArray[i]);
				po.write(podHolder);
			}
		}
	}
}

function PlayBatMedia(Lang, Media) {
	var so 			= new SWFObject(“/arkhamasylum/data/assets/" + BaseURL + "flash/mediaVideo.swf", "Bat Media", "514", "320", "6", "#FFFFFF");
	var	MediaExt	= "";
	
		if (Media != "environmental") {
		switch(Lang) {
			case "de":
			MediaExt		= "_de";		
			break;
			
			case "it":
			MediaExt		= "_it";		
			break;
			
			case "es":
			MediaExt		= "_es";		
			break;
			
			case "fr":
			MediaExt		= "_fr";		
			break;
			
			case "en_us":
			MediaExt		= "_us";		
			break;
			  
			default:
			MediaExt		= "";
		}
		
		if ((Media == "breakout") && ((Lang == "") || (Lang == "es") || (Lang == "it"))) {
			MediaExt		= "";
		}
		
		if ((Media == "play_joker") && ((Lang == "") || (Lang == "es") || (Lang == "it"))) {
			MediaExt		= "";
	}
	
	}
	
	MediaURL		= “/arkhamasylum/data/assets/" + BaseURL + "videos/" + Media + "/" + Media + MediaExt + ".flv";
	so.addVariable("FLVPath", MediaURL);
	so.addVariable("BasePath", BaseURL);
	so.addParam("wmode", "transparent");
	so.write("TV");
}

function PlayHomeTrailer(movie,Lang) {
	var so = new SWFObject(“/arkhamasylum/data/assets/" + BaseURL + "flash/homeVideo.swf", "Trailer", "700", "394", "6", "#000000");
	
	if (Lang) {
		trailer	= "movie_" + Lang;
	}
	
	else {
		trailer	= movie;
	}
	so.addVariable("FLVPath", “/arkhamasylum/data/assets/" + BaseURL + "videos/" + movie + "/" + trailer + ".flv");
	so.addParam("wmode", "transparent");
	so.addVariable("BasePath", BaseURL);
	so.write("Carrousel");
}

function AgeChecker() {
	var min_age 		= 13;
	var Year 			= parseInt(document.forms[0].Year.value);
	var Month 			= parseInt(document.forms[0].Month.value);
	var Day				= parseInt(document.forms[0].Day.value);
	
	if ((Year) && (Month) && (Day)) {
		var theirDate 	= new Date((Year + min_age), Month, Day);
		var toDay 		= new Date;
		var difference	= toDay.getTime() - theirDate.getTime();
	
		if (difference < 0) {
			alert("- Sorry, but you are not permitted to view these materials at this time");
		}
		
		else {
			window.location.href = "/newsletter";
		}
		
		}
		
	else {
		alert("- Please Select your DOB to proceed");	
	}
}

function CheckLogin() {
	md5hash(vb_login_password, vb_login_md5password, vb_login_md5password_utf, 0);
}

function showPrice(prize,title,text) {
	if (document.getElementById("Prizes")) {
		
		//var toolTip = "onMouseOver=\"ddrivetip('" + text + "','black', 300)\"; " + "onMouseout=\"hideddrivetip()\"";
	
		var toolTip = "";

		prizeText = title + ":\n" + text;
		document.getElementById("Prizes").innerHTML = "<img src=\”/arkhamasylum/data/assets/" + BaseURL + "/images/competitions/large/" + prize + ".gif\"" + toolTip +  " alt=\"\" />";
	}
}




function openwindow() {
	window.open("/tandc","mywindow","menubar=1,scrollbars=1,resizable=1,width=430,height=400");
}








}
