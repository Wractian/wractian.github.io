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
		game.id = setInterval(frame,)
		function frame() {
			if (width >=100){
				clearInterval(game.id);
				elem.style.width = '0%';
				game.numberValue++;
				document.getElementById('barNumber').innerHTML="Points:"+game.numberValue;
				game.id=false;
			}else{
				width+=game.barSpeed;
				elem.style.width = width+'%';
			}
		}
	}}