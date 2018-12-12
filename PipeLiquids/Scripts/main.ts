"use strict";


class Vector2D {
    x: number;
    y: number;
    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    toArray(){
        let retarr = [];
        retarr[0] = this.x;
        retarr[1] = this.y;
        return(retarr);
    }

};

class Machine {
    position: Vector2D;
    constructor(pos: Vector2D){
        this.position = pos;
    }
}

class Basic_Machine extends Machine {
    size: Vector2D;
    texture : string;
    constructor(pos: Vector2D, size: Vector2D, texture: string){
        super(pos);
        this.size = size;
        this.texture = texture;
    }
}

class Complex_Machine extends Machine {
    size: Vector2D[];
    texture : string;
    constructor(pos: Vector2D, size: Vector2D[], texture: string){
        super(pos);
        this.size = size;
        this.texture = texture;
    }
}


var y = new Vector2D(1,2);
var m = new Basic_Machine(y,y,"hit or miss");
console.log(m);

var u: Vector2D[] = [y, new Vector2D(2,3)];var c = new Complex_Machine(y,u,"hit or miss");
console.log(c);

