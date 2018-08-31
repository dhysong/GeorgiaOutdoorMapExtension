'use strict';

function goTo(){
	var txtWma = document.getElementById("wma");
	
	var code = "";// = "console.log(document.querySelectorAll('.wildlife')); ";
	code += "this.location.href='javascript:(function (){ ";
	code += "document.querySelectorAll(\".wildlife\")[0].checked = true; ";
	code += "maxzoom = 13;";
	code += "resetMap();";
	code += "toggleLayer(true, \"WRDLayer\");";
	code += "toggleAttrib(true,\"WMA\");";
	code += "toggleClass(true, \"wildlife\");";
	code += "toggleZoomType(" + txtWma.dataset.lat + ", " + txtWma.dataset.lng + "); "; 
	code += "void 0; ";
	code += "})();'";	
	
	chrome.tabs.executeScript(null, {
		code: code
	});
}


function hideFilters(){
	var display = document.querySelector('#ckbHideFilters:checked') && document.querySelector('#ckbHideFilters:checked').value === "on" ? "none" : "block";
	chrome.tabs.executeScript({
		code: 'document.getElementById("nav").style.display="' + display + '"; document.getElementById("nav_buttons").style.display="' + display + '";'
	});
}

function bindAutoComplete(json) {
	autocomplete(document.getElementById("wma"), json.Data);	
}

document.addEventListener('DOMContentLoaded', function () {  
	document.getElementById("wma").focus();
	
	const url = chrome.runtime.getURL('wma_data.json');

	fetch(url)
	.then((response) => response.json())
	.then((json) => { bindAutoComplete(json); })

	document.getElementById('btnGo').addEventListener("click", goTo);
  
	document.getElementById('ckbHideFilters').addEventListener("click", hideFilters);
});