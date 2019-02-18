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

class Tileset {
    /**
     * 
     * @param {string} file file location
     * @param {number} sw positive int
     * @param {number} sh positive int
     */
    constructor(file, sw, sh) {
        this.sw = sw || 32;
        this.sh = sh || 32;
        this.tw;
        this.th
        this.width
        this.height
        this.canvas;
        var img = document.createElement("img");
        img.src = file;
        img.onload = function () {
            this.width = img.width;
            this.height = img.height;
            this.tw = this.width / this.sw;
            this.th = this.height / this.sh;
            this.canvas = new OffscreenCanvas(img.width, img.height)
            this.canvas.getContext("2d").drawImage(img, 0, 0);
        }.bind(this);


    }
    printtile(tile, x, y) {


        var targeth = Math.trunc(tile / (this.tw));
        var targetw = tile - (targeth * this.tw);
        return [this.canvas,
        targetw * this.sw,
        targeth * this.sh,
        this.sw,
        this.sh,
            x,
            y,
        this.sw,
        this.sh
        ];
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


var prevtime;
var fpsarr = [];



var tilespritesheet = new Tileset("Content/Sprites/test.png", 32, 32);
var playerspritesheet = new Tileset("Content/Sprites/player.png", 32, 32);



var renderlist = []
var renderdepth = 10
var direction = 0;
var moving = 0;
var toggle = false;

function gameLoop() {
    var sum = Utils.sumArr(fpsarr) / fpsarr.length;
    sum = Math.trunc((1 / sum) * 1000);
    document.getElementById("fpsmeter").innerHTML = sum;



    var playerspeed = 4;
    if (moving == 0) {
        if (keys["w"] || keys["arrowup"]) {
            moving = 32;
            direction = 3;
        }
        if (keys["s"] || keys["arrowdown"]) {
            moving = 32;
            direction = 1;
        }
        if (keys["a"] || keys["arrowleft"]) {
            moving = 32;
            direction = 2;
        }
        if (keys["d"] || keys["arrowright"]) {
            moving = 32;
            direction = 0;
        }
    }
    renderlist = [];
    for (let i = 0; i < renderdepth; i++) {
        renderlist.push([]);
    }

    if (keys["t"]) {
        toggle = !toggle;
    }

    if (moving != 0) {
        switch (direction) {
            case 0:
                ch.x -= playerspeed;
                moving -= playerspeed;
                break;
            case 1:
                ch.y -= playerspeed;
                moving -= playerspeed;
                break;
            case 2:
                ch.x += playerspeed;
                moving -= playerspeed;
                break;
            case 3:
                ch.y += playerspeed;
                moving -= playerspeed;
                break;
        }
    }

    var playerpos = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    }

    renderlist[1].push(playerspritesheet.printtile(toggle ? 1 : 0, playerpos.x, playerpos.y))

    var worldw = 50;
    var worldh = 50;


    for (let i = 0; i < worldw; i++) {
        for (let j = 0; j < worldh; j++) {
            var tile = 0;
            if (i == 0 || j == 0 || i == worldw - 1 || j == worldh - 1 || i == j) {
                tile = 2;
            }
            var position = {
                x: ch.x + i * 32,
                y: ch.y + j * 32
            }
            if (Math.abs(position.x - canvas.width / 2) < 500 && Math.abs(position.y - canvas.height / 2) < 320) {
                renderlist[0].push(tilespritesheet.printtile(tile, position.x, position.y));
            }

        }
    }


}

function animLoop(time) {
    window.requestAnimationFrame(animLoop);
    //Deals with fps stuff
    var timediff = time - prevtime;
    if (fpsarr.length >= 30) {
        fpsarr.shift();
    }
    fpsarr.push(timediff);



    //DRAW STUFF
    context.clearRect(0, 0, canvas.width, canvas.height);
    //D corresponds to depth, whereas i correponds to number
    for (let d = 0; d < renderlist.length; d++) {
        for (let i = 0; i < renderlist[d].length; i++) {
            context.drawImage(renderlist[d][i][0],
                renderlist[d][i][1],
                renderlist[d][i][2],
                renderlist[d][i][3],
                renderlist[d][i][4],
                renderlist[d][i][5],
                renderlist[d][i][6],
                renderlist[d][i][7],
                renderlist[d][i][8])
        }
    }
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







setInterval(gameLoop, 20);
window.requestAnimationFrame(animLoop);