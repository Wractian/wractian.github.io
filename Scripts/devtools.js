function fillBees() {
    "use strict";
    var i;
    for (i = 1; i < game.drawer.drawerCounter + 1; i += 1) {
        addBee(null, "beeCell" + i);
    }
}

function deleteBees() {
    "use strict";
    var i, id, bees, object, condition;
    for (i = 0; i < game.drawer.cells.length; i += 1) {
        if (game.drawer.cells[i].firstElementChild.hasChildNodes()) {
            object = searchBees(game.drawer.cells[i].firstElementChild.firstElementChild);
            condition = $(object.element).hasClass('deleting');
            if (!condition) {
                $(object.element).fadeOut(300, "linear");
                $(object.element).addClass('deleting');
                setTimeout(dbees, 300, object);
            }
        }
    }
}

function dbees(object) {
    object.delete();
}
