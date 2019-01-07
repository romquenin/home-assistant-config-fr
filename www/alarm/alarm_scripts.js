//WARNING any changes to HA UI will break this code. Need to find an alternative solution as getElementsByTagName("main") doesnt work probably due to polymer
var mainID = 'main';
var sidebarID = 'drawer';

var main = null;
var sidebar = null;

function searchRoot(rootArray, findID){

	for (var i = 0; i < rootArray.childNodes.length; i++) {
		
		if (rootArray.childNodes[i].id == findID) {
			if (findID == mainID) main = rootArray.childNodes[i].style;
			if (findID == sidebarID) sidebar = rootArray.childNodes[i].style;
		}
		if (rootArray.childNodes[i].root != null) {
			searchRoot(rootArray.childNodes[i].root, findID);
		}
		else if (rootArray.childNodes[i].childNodes != null) {
			searchRoot(rootArray.childNodes[i], findID);
		}
	}
}

function disableSidebar(){
   main.left = '0';
   sidebar.width = '0';
}

function enableSidebar(){
   main.left = mainLeft;
   sidebar.width = sidebarWidth;
}

searchRoot(document.getElementsByTagName("body")[0], mainID);
searchRoot(document.getElementsByTagName("body")[0], sidebarID);

var mainLeft = main.left;
var sidebarWidth = sidebar.width;

disableSidebar();
enableSidebar();


