'use strict';
//imports
import Utils from "./Utils.js";

class Character {
    constructor(name, health, sanity) {
        this.name = name;
        this.health = health;
        this.sanity = sanity;
        this.Moves = [];
        this.Statuses = [];
        this.Items = [];
        this.x = 0;
        this.y = 0;
    }
    useMove(num, target) {
        this.Moves[num].useMove(target);
    }

    tickStatuses() {
        for (let i = 0; i < this.Statuses.length; i++) {
            this.Statuses[i].tick(this);
            if (this.Statuses[i].duration <= 0) {
                this.Statuses.splice(i, 1);
            }
        }
    }

    tickItems() {
        for (let i = 0; i < this.Items.length; i++) {
            this.Items[i].tick(this);
        }
    }

    addMove(move) {
        this.Moves.push(move);
    }

    addStatus(status) {
        this.Statuses.push(status);
    }

    addItem(item) {
        this.Items.push(item);
    }

    //Dev Functions
    logItemList() {
        console.table(this.Items);
    }
}

class Status {
    constructor(name, duration, tickfunc) {
        this.name = name ? name : "unnamed status";
        this.duration = duration ? duration : 1;
        this.tickfunc = tickfunc ? tickfunc : function () { };
    }

    tick(char) {
        this.tickfunc(char);
        this.duration = this.duration - 1;
    }
}

class Bleed extends Status {
    constructor(duration, strength) {
        duration = duration ? duration : 5;
        strength = strength ? strength : 1;

        super("Bleed", duration, function (char) {
            char.health = char.health - strength;
        });
    }
}

class Move {
    constructor(name, damage, func) {
        this.name = name ? name : "unnamed move";
        this.damage = damage ? damage : 1;
        this.usefunc = func ? func : function () { };
    }
    useMove(target) {
        console.log(`Using move ${this.name}`);
        this.usefunc(target);
    }
}

class Item {
    constructor(name, id, sprite, desc, func) {
        this.name = name ? name : "unnamed item";
        this.id = id ? id : 0;
        this.sprite = sprite ? sprite : "default";
        this.desc = desc ? desc : "This item has no description";
        this.tickfunc = func ? func : function () { };
    }

    tick(char) {
        this.tickfunc(char);
    }

    get info() {
        return [this.name, this.desc];
    }
}

function onresize() {
    var desiredAspectRatio = 4 / 3;
}
window.addEventListener("resize", onresize);

var keys = [];

function keyboardHandler(e) {
    if (e.type == "keydown") {
        keys[e.key.toLowerCase()] = true;
    }
    if (e.type == "keyup") {
        keys[e.key.toLowerCase()] = false;
    }
}
window.addEventListener("keydown", keyboardHandler, false);
window.addEventListener("keypress", keyboardHandler, false);
window.addEventListener("keyup", keyboardHandler, false);

var x = 0;
var prevtime;
var fpscap = 31;
var fpsarr = [];

var imagesource = document.createElement("img");
imagesource.src = "Content/Sprites/test.png";

var playerspritesheet = new OffscreenCanvas(64, 64);
var spritesheetctx = playerspritesheet.getContext("2d");
var playerimage = document.createElement("img");
playerimage.src = "Content/Sprites/player.png";
playerimage.onload = function () {
    spritesheetctx.drawImage(playerimage, 0, 0, 32, 32, 0, 0, 32, 32);
    playerimage.src = "Content/Sprites/player2.png";
    playerimage.onload = function () {
        spritesheetctx.drawImage(playerimage, 0, 0, 32, 32, 32, 0, 32, 32);
    }
}



var renderlist = []
var renderdepth = 10
var drawspecial;
var toggle = false;
function gameLoop() {
    var playerspeed = 2;

    if (keys["w"] || keys["arrowup"]) {
        ch.y -= playerspeed;
    }
    if (keys["s"] || keys["arrowdown"]) {
        ch.y += playerspeed;
    }
    if (keys["a"] || keys["arrowleft"]) {
        ch.x -= playerspeed;
    }
    if (keys["d"] || keys["arrowright"]) {
        ch.x += playerspeed;
    }

    ch.x = Utils.clamp(ch.x, 0, canvas.width - 32)
    ch.y = Utils.clamp(ch.y, 0, canvas.height - 32)


    renderlist = [];
    for (let i = 0; i < renderdepth; i++) {
        renderlist.push([]);
    }

    if(keys["t"]){
        toggle = !toggle;
    }
    drawspecial = [playerspritesheet, toggle? 0:32, 0, 32, 32, ch.x, ch.y, 32, 32]

    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 19; j++) {
            renderlist[0].push([imagesource, i * 32, j * 32])
        }
    }


}

function animLoop(time) {
    window.requestAnimationFrame(animLoop);
    //Deals with fps stuff
    var timediff = time - prevtime;
    //if (timediff < 1000 / fpscap) {
    //    return;
    //}
    if (fpsarr.length >= 30) {
        fpsarr.shift();
    }
    fpsarr.push(timediff);

    var sum = Utils.sumArr(fpsarr) / fpsarr.length;
    sum = Math.trunc((1 / sum) * 1000);
    document.getElementById("fpsmeter").innerHTML = sum;

    //DRAW STUFF
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let d = 0; d < renderlist.length; d++) {
        for (let i = 0; i < renderlist[d].length; i++) {
            context.drawImage(renderlist[d][i][0], renderlist[d][i][1], renderlist[d][i][2])
        }
    }

    context.drawImage(drawspecial[0], drawspecial[1], drawspecial[2], drawspecial[3], drawspecial[4], drawspecial[5], drawspecial[6], drawspecial[7], drawspecial[8])

    x += 1;
    prevtime = time;
}

var ch = new Character("Liam", 10, 10);
ch.addMove(
    new Move("Slice", 10, function (e) {
        console.log(e);
    })
);
ch.addMove(
    new Move("Rend", 9, function (char) {
        char.addStatus(new Bleed(5, 1));
    })
);
ch.addItem(
    new Item(
        "Health Orb",
        0,
        "/Content/Orb.png",
        "An orb that restores HP at the cost of sanity",
        function (char) {
            char.health++;
            char.sanity--;
        }
    )
);

var canvassize = 576
var canvas = document.getElementById("mainCanvas");
canvas.height = canvassize;
canvas.width = canvassize * 4 / 3;
var context = canvas.getContext("2d");






window.requestAnimationFrame(animLoop);
setInterval(gameLoop, 20);