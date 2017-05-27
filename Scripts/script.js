function Game() {
    game = {};
    game.bees = {};
    game.trash = {};
    game.drawer = {};
    game.drawer.cells = [];
    game.drawer.drawerCounter = 0;
    game.bees.maxBees = 100;
    game.tick = 0;
    game.beeCounter = 0;
    game.trash.trashon = false;
    game.trash.trashList = [];
    //DeveloperStuff {
    beeDrawer();
    beeBox(null, 1);
    //DeveloperStuff }
    game.Game = setInterval(ticks, 10);

    function ticks() {}
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
    evt.currentTarget.className += " active";
}

function beeBox(evt, increment) {
    var Boxes, Clone, Button
    var Parent = document.getElementById("MainBox");
    var Template = document.getElementsByClassName("template")[0]
    var Button = document.getElementById("beeButton");
    var Trash = document.getElementById("drawerTrash")
    if (increment == 1) {
        if (!(game.drawer.cells.length == 27)) {
            game.drawer.drawerCounter++
                var Clone = Template.firstElementChild.cloneNode(true);
            Clone.className += " beeCell"
            Clone.childNodes[1].id = "beeCell" + game.drawer.drawerCounter;
            $(Clone).hide();
            Parent.insertBefore(Clone, Parent.firstChild);
            game.drawer.cells.push(Clone);
            $(Clone).fadeIn(300, "linear")
            $(Button).fadeIn(300, "linear");
            $(Trash).fadeIn(300, "linear");
        }
    } else {
        var length = game.drawer.cells.length
        if (!(game.drawer.cells.length == 0)) {
            Parent.removeChild(game.drawer.cells[length - 1]);
            game.drawer.cells.splice(game.drawer.cells.length - 1)
            game.drawer.drawerCounter--
                if (game.drawer.cells.length == 0) {
                    $(Button).fadeOut(300, "linear")
                    $(Trash).fadeOut(300, "linear")
                }
        }

    }
}

function beeDrawer(evt) {
    var Box = document.getElementById("beeCollapse");
    var Button = document.getElementById("beeButton");
    if (Box.style.maxWidth) {
        Box.style.maxWidth = null;
        Button.innerHTML = "&laquo;"
    } else {
        Box.style.maxWidth = 100 + "%"
        Button.innerHTML = "&raquo;"
    }
}

function allowDrop(evt) {
    evt.preventDefault();
}

function drag(evt) {

    evt.dataTransfer.setData("dragid", evt.target.id)
    evt.dataTransfer.effectAllowed = "copyMove"
}

function drop(evt) {
    evt.preventDefault();
    if ((evt.target.className == "bugHolderDiv")) {
        var data = evt.dataTransfer.getData("dragid");
        evt.target.appendChild(document.getElementById(data))
    }
}

function addBee(evt, elementid) {
    for (var i = 0; i < 1; i++) {
        if ($("#" + elementid).hasClass("bugHolderDiv")) {
            if (($("#" + elementid).children().length == 0) || (elementid == "devCell")) {
                var Template = document.getElementsByClassName("template")[1];
                var Clone = Template.cloneNode(false);
                Clone.className = Clone.className.replace("template", " bee");
                game.beeCounter++
                    Clone.id = "bee" + game.beeCounter;
                $(Clone).hide();
                document.getElementById(elementid).appendChild(Clone);
                $(Clone).fadeIn(300, "linear");
            }
        }
    }
}

function beeSelect(evt) {
    var index
    if (game.trash.trashon) {
        if (evt.currentTarget.firstElementChild.childNodes.length) {
            if (true) {
                if (evt.currentTarget.style.backgroundColor == "rgb(241, 241, 241)") {
                    evt.currentTarget.style.backgroundColor = "#ef0202";
                    if (!(game.trash.trashList.includes(evt.currentTarget)))
                        game.trash.trashList.push(evt.currentTarget)
                } else {
                    if (game.trash.trashList.includes(evt.currentTarget)) {
                        index = game.trash.trashList.indexOf(evt.currentTarget)
                        game.trash.trashList.splice(index, 1)

                    }
                    evt.currentTarget.style.backgroundColor = "#f1f1f1";
                }
            }
        }
    }
}

function beeTrash(evt) {
    if (game.trash.trashon) {
        game.trash.trashon = false
        evt.currentTarget.style.backgroundColor = "#f1f1f1"
        for (var i = 0; i < game.trash.trashList.length; i++) {
            var element = game.trash.trashList[i]
            element.style.backgroundColor = "#f1f1f1";
            $(element.firstElementChild.firstElementChild).fadeOut(300, "linear")
            var id = setTimeout(removeBee, 300, element.firstElementChild);

            function removeBee(target) {
                target.removeChild(target.firstElementChild)
                console.log("test")
            }
        }
        var bees = document.getElementsByClassName("bee")
        for (var i = 0; i < bees.length; i++) {
            bees[i].setAttribute('draggable', 'true');
        }
        game.trash.trashList = [];
    } else {
        evt.currentTarget.style.backgroundColor = "#ef0202"
        game.trash.trashon = true
        var bees = document.getElementsByClassName("bee")
        for (var i = 0; i < bees.length; i++) {
            bees[i].setAttribute('draggable', 'false');
        }
    }
}
