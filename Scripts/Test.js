function Game() {
	game = {};
	game.bees={};
	game.trash={};
	game.bees.maxBees=100;
	game.tick=0;
	game.drawerCounter=0;
	game.beeCounter=0;
	game.trash.trashon=false;
	game.trash.trashList = [];
	//DeveloperStuff {
	beeDrawer();
	beeBox(null,1)
	addBee(null,"beeCell1")
	//DeveloperStuff }
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
	evt.currentTarget.className += " active";
}
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
function addBee(evt,elementid) {
	for (var i = 0; i < 1; i++) {
		if ($("#"+elementid).hasClass( "bugHolderDiv" )){
			var Template = document.getElementsByClassName("template")[1]
			var Clone = Template.cloneNode(false);
			Clone.className = Clone.className.replace("template", "");
			game.beeCounter++
			Clone.id="bee"+game.beeCounter	
			document.getElementById(elementid).appendChild(Clone)
		}
	}
}
function beeSelect(evt) {
	var index
	if (game.trash.trashon) {
		if (evt.currentTarget.firstElementChild.childNodes.length){
			if (true) {
				if (evt.currentTarget.style.backgroundColor=="rgb(241, 241, 241)")
				{
					evt.currentTarget.style.backgroundColor="#ef0202";
					if (!(game.trash.trashList.includes(evt.currentTarget)))
					game.trash.trashList[game.trash.trashList.length]=evt.currentTarget;
				}else{
					if (game.trash.trashList.includes(evt.currentTarget))
					{
						index = game.trash.trashList.indexOf(evt.currentTarget)
						game.trash.trashList.splice(index,1)

					}
					evt.currentTarget.style.backgroundColor="#f1f1f1";
				}
			}
		}
	}
}
function beeTrash(evt){ 
	if (game.trash.trashon) {
		game.trash.trashon=false
		evt.currentTarget.style.backgroundColor="#f1f1f1"
		for (var i = 0; i < game.trash.trashList.length; i++) {
			game.trash.trashList[i].style.backgroundColor="#f1f1f1";
		}
		game.trash.trashList=[];
	}else{
		evt.currentTarget.style.backgroundColor="#ef0202"
		game.trash.trashon=true
	}
}