function Game() {
	game.bees.maxBees=100;
	beeDrawer();
	var tick=0;
	game.drawerCounter=0;
	game.beeCounter=0;
	beeBox(null,1)
	game.Game=setInterval(ticks,10);
	function ticks() {
	}
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
	var Boxes, Clone, Button
	var Parent = document.getElementById("MainBox");
	var Template = document.getElementsByClassName("template")[0]
	var Button = document.getElementById("beeButton");
	if (increment==1){
		if (!(document.getElementsByClassName("beeCell").length==27)){
		game.drawerCounter++
		var Clone = Template.firstElementChild.cloneNode(true);
		Clone.className += " beeCell"
		Clone.childNodes[1].id="beeCell"+game.drawerCounter;
		Parent.appendChild(Clone);
		Button.className = Button.className.replace(" hidden","");
		}
	}else{
		if (!(document.getElementsByClassName("beeCell").length==0)){
			var Boxes = document.getElementsByClassName("beeCell");
			Parent.removeChild(Boxes[Boxes.length-1]);
			game.drawerCounter--
			if (document.getElementsByClassName("beeCell").length==0){
					Button.className+= " hidden"
			}
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
	evt.dataTransfer.effectAllowed = "copyMove"
}
function drop(evt) {
	evt.preventDefault();
	if ((evt.target.className=="bugHolderDiv")) {
	var data = evt.dataTransfer.getData("dragid");
	evt.target.appendChild(document.getElementById(data))
	}
}
function addBee(evt) {
	for (var i = 0; i < 10; i++) {
		
	
	var Template = document.getElementsByClassName("template")[1]
	var Clone = Template.cloneNode(false);
	Clone.className = Clone.className.replace("template", "");
	game.beeCounter++
	Clone.id="bee"+game.beeCounter	
	document.getElementById("devCell").appendChild(Clone)
}
}
function beeSelect(evt) {
	if (evt.currentTarget.firstElementChild.childNodes.length){
		if (true) {
			if (evt.currentTarget.style.borderColor=="black")
			{
				evt.currentTarget.style.borderColor="#08ca08"
			}else{
				evt.currentTarget.style.borderColor="black"
			}
		}
	}
}
