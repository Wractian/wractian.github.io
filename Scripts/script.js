function Game() {
    "use strict";
    game.bees = {};
    game.trash = {};
    game.drawer = {};
    game.drawer.cells = [];
    game.drawer.drawerCounter = 0;
    game.bees.maxBees = 100;
    game.bees.beeStats = [];
    game.bees.bees = [];
    game.tick = 0;
    game.bees.beeCounter = 0;
    game.trash.trashon = false;
    game.trash.trashList = [];
    //DeveloperStuff {
    beeDrawer();
    beeBox(null, 1);
    //DeveloperStuff }
    game.Game = setInterval(ticks, 10);

    function ticks() {
        //placeholder
        game.tick += 1;
    }
}

function tabChange(evt, tabName) {
    "use strict";
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i += 1) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i += 1) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function beeBox(evt, increment) {
    "use strict";
    var Boxes, Clone, Button, Parent, Template, Trash, length, condition;
    Parent = document.getElementById("MainBox");
    Template = document.getElementsByClassName("template")[0];
    Button = document.getElementById("beeButton");
    Trash = document.getElementById("drawerTrash");
    if (increment == 1) {
        condition = (game.drawer.cells.length === 27);
        if (!condition) {
            game.drawer.drawerCounter += 1;
            Clone = Template.firstElementChild.cloneNode(true);
            Clone.className += " beeCell";
            Clone.childNodes[1].id = "beeCell" + game.drawer.drawerCounter;
            $(Clone).hide();
            Parent.insertBefore(Clone, Parent.firstChild);
            game.drawer.cells.push(Clone);
            $(Clone).fadeIn(300, "linear");
            $(Button).fadeIn(300, "linear");
            $(Trash).fadeIn(300, "linear");
        }
    } else {
        length = game.drawer.cells.length;
        condition = game.drawer.cells.length === 0;
        if (!condition) {
            condition = game.drawer.cells[length - 1].firstElementChild.hasChildNodes();
            if (condition) {
                removeBee(game.drawer.cells[length - 1].firstElementChild);
            }
            Parent.removeChild(game.drawer.cells[length - 1]);
            game.drawer.cells.splice(game.drawer.cells.length - 1);
            game.drawer.drawerCounter += -1;
            if (game.drawer.cells.length === 0) {
                $(Button).fadeOut(300, "linear");
                $(Trash).fadeOut(300, "linear");
            }

        }

    }
}

function beeDrawer(evt) {
    "use strict";
    var Box, Button;
    Box = document.getElementById("beeCollapse");
    Button = document.getElementById("beeButton");
    if (Box.style.maxWidth) {
        Box.style.maxWidth = null;
        Button.innerHTML = "&laquo;";
    } else {
        Box.style.maxWidth = 100 + "%";
        Button.innerHTML = "&raquo;";
    }
}

function allowDrop(evt) {
    "use strict";
    evt.preventDefault();
}

function drag(evt) {
    "use strict";
    evt.dataTransfer.setData("dragid", evt.target.id);
    evt.dataTransfer.effectAllowed = "copyMove";
}

function drop(evt) {
    "use strict";
    var data;
    evt.preventDefault();
    if (evt.target.className === "bugHolderDiv") {
        data = evt.dataTransfer.getData("dragid");
        evt.target.appendChild(document.getElementById(data));
    }
}

function addBee(evt, elementid) {
    "use strict";
    var i, Template, Clone;
    for (i = 0; i < 1; i += 1) {
        if ($("#" + elementid).hasClass("bugHolderDiv")) {
            if (($("#" + elementid).children().length === 0) || (elementid === "devCell")) {
                Template = document.getElementsByClassName("template")[1];
                Clone = Template.cloneNode(false);
                Clone.className = Clone.className.replace("template", " bee");
                Clone.id = "bee" + game.bees.beeCounter;
                game.bees.beeCounter += 1;
                game.bees.bees.push(Clone);
                game.bees.beeStats.push([1,2,3,game.bees.beeCounter]);
                $(Clone).hide();
                document.getElementById(elementid).appendChild(Clone);
                $(Clone).fadeIn(300, "linear");
            }
        }
    }
}

function beeSelect(evt) {
    "use strict";
    var index;
    if (game.trash.trashon) {
        if (evt.currentTarget.firstElementChild.childNodes.length) {
            if (true) {
                if (evt.currentTarget.style.backgroundColor === "rgb(241, 241, 241)") {
                    evt.currentTarget.style.backgroundColor = "#ef0202";
                    if (!(game.trash.trashList.includes(evt.currentTarget))) {
                        game.trash.trashList.push(evt.currentTarget);
                    }
                } else {
                    if (game.trash.trashList.includes(evt.currentTarget)) {
                        index = game.trash.trashList.indexOf(evt.currentTarget);
                        game.trash.trashList.splice(index, 1);

                    }
                    evt.currentTarget.style.backgroundColor = "#f1f1f1";
                }
            }
        }
    }
}

function removeBee(target) {
    "use strict";
    var index;
    index = game.bees.bees.indexOf(target.firstElementChild);
    game.bees.bees.splice(index, 1);
    target.removeChild(target.firstElementChild);
    relistBees();
    game.bees.beeCounter = game.bees.bees.length;
}

function beeTrash(evt) {
    "use strict";
    var element, i, bees;


    if (game.trash.trashon) {
        game.trash.trashon = false;
        evt.currentTarget.style.backgroundColor = "#f1f1f1";
        for (i = 0; i < game.trash.trashList.length; i += 1) {
            element = game.trash.trashList[i];
            element.style.backgroundColor = "#f1f1f1";
            $(element.firstElementChild.firstElementChild).fadeOut(300, "linear");
            setTimeout(removeBee, 300, element.firstElementChild);
        }
        bees = document.getElementsByClassName("bee");
        for (i = 0; i < bees.length; i += 1) {
            bees[i].setAttribute('draggable', 'true');
        }
        game.trash.trashList = [];
    } else {
        evt.currentTarget.style.backgroundColor = "#ef0202";
        game.trash.trashon = true;
        bees = document.getElementsByClassName("bee");
        for (i = 0; i < bees.length; i += 1) {
            bees[i].setAttribute('draggable', 'false');
        }
    }
}

function relistBees() {
    var alphaBees, i, numA, numB;
    alphaBees = game.bees.bees;
    alphaBees.sort(function(a, b) {
        numA = a.id.replace("bee", "");
        numB = b.id.replace("bee", "");
        return numA - numB;
    });
    for (i = 0; i < alphaBees.length; i += 1) {
        alphaBees[i].id = "bee" + i;
    }
    game.bees.bees = alphaBees;
}
