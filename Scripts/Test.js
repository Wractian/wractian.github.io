function Game() {
	var tick=0
	Game.Game=setInterval(ticks,10)
	function ticks() {
		tick++
		document.getElementById("ticks").innerHTML=tick;
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

function StartProg(evt) {
	var elem = document.getElementById("bar");
	var width =0;
	if (game.id==false){
		game.id = setInterval(frame,1)
		function frame() {
			if (width >=100){
				clearInterval(game.id);
				elem.style.width = '0%';
				game.numberValue+=game.incrementSpeed;
				
				game.id=false;
			}else{
				width+=game.barSpeed;
				elem.style.width = width+'%';
			}
		}
	}}

function Upgrade(evt, upgrade) {
	if ((evt.currentTarget.id=="barSpeed")&&(evt.currentTarget.classList.contains("active"))){
		game.numberValue-=100*game.barSpeed
		game.barSpeed=game.barSpeed+.1
		game.barSpeed=Math.round(game.barSpeed*1000)/1000
		game.numberValue=Math.floor(game.numberValue)
	}
	if ((evt.currentTarget.id=="incrementSpeed")&&(evt.currentTarget.classList.contains("active"))){
		game.numberValue-=10*game.incrementSpeed
		game.incrementSpeed=game.incrementSpeed+1
		game.incrementSpeed=Math.round(game.incrementSpeed*1000)/1000
		game.numberValue=Math.floor(game.numberValue)
	}
}