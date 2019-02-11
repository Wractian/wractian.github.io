class Character {

    Moves = [];
    Statuses = [];
    Items = [];

    constructor(name, health, sanity) {
        this.name = name;
        this.health = health;
        this.sanity = sanity;
    }

    useMove(num,target) {
        this.Moves[num].useMove(target);
    }
    
    tickStatuses() {
        for (let i = 0; i < this.Statuses.length; i++) {
            this.Statuses[i].tick(this);
            if (this.Statuses[i].duration <= 0) {
                this.Statuses.splice(i,1)
            }
        }
    }

    tickItems() {
        for (let i = 0; i < this.Items.length; i++) {
            this.Items[i].tick(this);
        }
    }

    addMove(move){
        this.Moves.push(move);
    }

    addStatus(status){
        this.Statuses.push(status);
    }

    addItem(item){
        this.Items.push(item);
    }

    //Dev Functions
    logItemList(){
        console.table(this.Items);
    }
};


class Status {

    constructor(name, duration, tickfunc){
        this.name = name ? name : "unnamed status";
        this.duration = duration ? duration: 1;
        this.tickfunc = tickfunc ? tickfunc : function(){};
        
    }

    tick(char){
        this.tickfunc(char);
        this.duration = this.duration - 1;
    }

}

class Bleed extends Status {

    constructor(duration,strength){
        duration = duration ? duration : 5;
        strength = strength ? strength : 1;
    
        super("Bleed", duration, function(char){char.health = char.health - strength})
    }

}


class Move {

    constructor(name, damage, func) {
        this.name = name ? name : "unnamed move";
        this.damage = damage ? damage : 1;
        this.usefunc = func ? func : function(){};
    }
    useMove(target) {
        console.log(`Using move ${this.name}`);
        this.usefunc(target)
    }
}

class Item { 
    constructor(name, id, sprite, desc, func) {
        this.name = name ? name : "unnamed item";
        this.id = id ? id: 0;
        this.sprite = sprite ? sprite : "default";
        this.desc = desc ? desc : "This item has no description";
        this.tickfunc = func ? func : function(){};
    }
    
    tick(char){
        this.tickfunc(char);
    }

    get info() {
        return [this.name,this.desc]
    }
}


function onresize(){
    var desiredAspectRatio = 4/3
    console.log()

}
window.addEventListener('resize' , onresize)


x = 0;
var prevtime,
fpscap = 36;
fpsarr = [];
function draw(time){
    window.requestAnimationFrame(draw);
    //Deals with fps stuff
    var timediff = time - prevtime;
    if(timediff < 1000 / fpscap){
        return;
    }
    if(fpsarr.length >= 30){
        fpsarr.shift();
    }
    fpsarr.push(timediff);
    var sum = 0;
    for (let i = 0; i < fpsarr.length; i++) {
        sum = sum + fpsarr[i];
    }
    sum = sum / fpsarr.length;
    sum = Math.trunc((1/sum) * 1000)
    document.getElementById("fpsmeter").innerHTML = sum;


    //Actual draw event

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath()
    context.arc(x,Math.sin(x/4)*10+60,40,0,2*Math.PI)
    context.stroke()
    x+=.5;
    prevtime = time



}

ch = new Character("Liam", 10, 10);
ch.addMove(new Move("Slice",10,function(e){console.log(e)}));
ch.addMove(new Move("Rend",9,function(char){char.addStatus(new Bleed(5,1))}));
ch.addItem(new Item("Health Orb",0,"/Content/Orb.png","An orb that restores HP at the cost of sanity", function(char){char.health++;char.sanity--}));



canvas = document.getElementById("mainCanvas");
canvas.height = 600;
canvas.width = 800;
context = canvas.getContext("2d");



window.requestAnimationFrame(draw);