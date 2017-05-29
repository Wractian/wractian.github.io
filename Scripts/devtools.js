function fillBees() {
    "use strict";
    var i;
    for (i = 1; i < game.drawer.drawerCounter + 1; i += 1) {
        addBee(null, "beeCell" + i);
    }
}

function deleteBees() {
    "use strict";
    var i, id, bees, object;
    for (i = 0; i < game.drawer.cells.length; i += 1) {
        if (game.drawer.cells[i].firstElementChild.hasChildNodes()) {
            object = searchBees(game.drawer.cells[i].firstElementChild.firstElementChild);
            $(object.element).fadeOut(300, "linear");
            setTimeout(dbees, 300, object);
        }
    }
}

function dbees(object) {
    object.delete();
}
