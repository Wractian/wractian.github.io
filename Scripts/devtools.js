function fillBees() {
    "use strict";
    var i;
    for (i = 1; i < game.drawer.drawerCounter + 1; i += 1) {
        addBee(null, "beeCell" + i);
    }
}

function deleteBees() {
    "use strict";
    var i, id, bees;
    for (i = 0; i < game.drawer.cells.length; i += 1) {
        if (game.drawer.cells[i].firstElementChild.hasChildNodes()) {
            $(game.drawer.cells[i].firstElementChild.firstElementChild).fadeOut(300, "linear");
            setTimeout(removeBee, 300, game.drawer.cells[i].firstElementChild);
        }
    }
}
