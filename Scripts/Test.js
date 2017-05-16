function Game() {
	beeDrawer()
	var tick=0
	game.drawerCounter=1;
	game.Game=setInterval(ticks,10)
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
	var Template = document.getElementsByClassName("template")[0]
	if (increment==1){
		if (!(document.getElementsByClassName("beeCell").length==26)){
		game.drawerCounter++
		var Clone = Template.firstElementChild.cloneNode(true);
		Clone.className += " beeCell"
		Clone.childNodes[1].id="beeCell"+game.drawerCounter;
		Parent.appendChild(Clone);
		}
	}else{
		if (!(document.getElementsByClassName("beeCell").length==1)){
			var Boxes = document.getElementsByClassName("beeCell")
			Parent.removeChild(Boxes[Boxes.length-1])
			game.drawerCounter--
		}
	}
}
function beeDrawer(evt) {
	var Boxes = document.getElementById("beeCollapse");
	var Button = document.getElementById("beeButton");
	if (Boxes.style.maxWidth){
		Boxes.style.maxWidth = null;
		Button.innerHTML = "&laquo;"
	} else {
		Boxes.style.maxWidth = 100 + "%"
		Button.innerHTML = "&raquo;"
	} 
}
function allowDrop(evt) {
	evt.preventDefault();
}
function drag(evt) {
	evt.dataTransfer.setData("dragid", evt.target.id)
}
function drop(evt) {
	evt.preventDefault();
	var data = evt.dataTransfer.getData("dragid");
	evt.target.appendChild(document.getElementById(data))
}
function addBee(evt) {
	alert("bees")
}