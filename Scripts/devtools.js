/**
 * @return {null}
 */
function devFillBees() {
    "use strict";
    var i;
    for (i = 1; i < game.drawer.drawerCounter + 1; i += 1) {
        addBee(null, "beeCell" + i);
    }
}
/**
 * @return {null}
 */
function devDeleteBees() {
    "use strict";
    var i, id, bees, object, condition;

    function dbees(object) {
        object.delete();
    }
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


/**
 * @param  {event}
 * @return {null}
 */
function devAddBee(evt) {
    "use strict";
    var i, condition;
    for (i = 0; i < game.drawer.cells.length; i += 1) {
        condition = game.drawer.cells[i].firstElementChild.hasChildNodes();
        if (!condition) {
            addBee(null, game.drawer.cells[i].firstElementChild.id);
            break;
        }
    }
}
/**
 * @param  {event}
 * @return {null}
 */
function devStartBreeding(evt) {
    "use strict";
    barHandler("progBar",25,devAddBee);
}
