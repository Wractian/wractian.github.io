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

function incrementbutton(evt) {
	button++
	if (button==1) {
		evt.currentTarget.innerHTML = "Clicked "+button+" time";
	}else{
		evt.currentTarget.innerHTML = "Clicked "+button+" times";
	}
}