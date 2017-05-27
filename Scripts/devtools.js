function fillBees(evt) {
	for (var i = 1; i < game.drawer.drawerCounter+1; i++) {
		addBee(null, "beeCell"+i)
	}
}
function deleteBees(evt) {
	for (var i = 0; i < game.drawer.cells.length; i++) {
		if (game.drawer.cells[i].firstElementChild.hasChildNodes()){
			$(game.drawer.cells[i].firstElementChild.firstElementChild).fadeOut(300, "linear")
			var id = setTimeout(removeBee , 300, game.drawer.cells[i].firstElementChild);
			function removeBee(target) {
				target.removeChild(target.firstElementChild)
			}
		}
	}
}