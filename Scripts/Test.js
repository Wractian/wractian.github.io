function Game() {
	var tick=0
	Game.Game=setInterval(ticks,10)
	function ticks() {}
}
function tabChange(evt, tabName) {

	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace("active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";}
function beeBox(evt, increment) {
	var Boxes, Clone, Parent
	var Parent = document.getElementById("Main Box");
	if (increment==1){
		var Clone = Parent.firstElementChild.cloneNode(true);
		Parent.appendChild(Clone);
	}else{
		var Boxes = document.getElementsByClassName("beeCell")
		Parent.removeChild(Boxes[Boxes.length-1])
	}
}
function beeDrawer(evt) {
	var Boxes = document.getElementById("beeCollapse");
	
	if (Boxes.style.maxWidth){
      Boxes.style.maxWidth = null;
      evt.currentTarget.innerHTML = "&laquo;"
    } else {
      Boxes.style.maxWidth = 100 + "%"
      evt.currentTarget.innerHTML = "&raquo;"
    } 
}