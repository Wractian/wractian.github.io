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

function StartProg(evt) {
	var elem = document.getElementById("bar");
	var width =0;
	if (id==false){
		id = setInterval(frame,10)
		function frame() {
			if (width >=100){
				clearInterval(id);
				elem.style.width = '0%';
				numberValue++;
				document.getElementById('BarNumber').innerHTML=numberValue;
				id=false;
			}else{
				width+=.5;
				elem.style.width = width+'%';
			}
		}
	}
}