"use strict";
/*

Maybe make the game with you manually clicking a "collect water" button,
and end the game with creating a silly fluid, like lemonaid or something funny like that

*/

class Vector2D {
    public x: number;
    public y: number;
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    public toArray() {
        const retarr = [];
        retarr[0] = this.x;
        retarr[1] = this.y;
        return (retarr);
    }
}
class Machine {
    public position: Vector2D;
    constructor(pos: Vector2D) {
        this.position = pos;
    }
}

class Basic_Machine extends Machine {
    private size: Vector2D;
    private texture: string;
    constructor(pos: Vector2D, size: Vector2D, texture?: string) {
        super(pos);
        this.size = size;
        this.texture = texture || "/Content/DefaultTexture.png";
    }
}

class Complex_Machine extends Machine {
    size: Vector2D[];
    texture: string;
    constructor(pos: Vector2D, size: Vector2D[], texture?: string) {
        super(pos);
        this.size = size;
        this.texture = texture || "/Content/DefaultTexture.png";
    }
}

class Basic_Distiller extends Basic_Machine {

    static capacitymax = 100;
    tank: FluidTank;
    public currentcapacity: number;
    constructor(pos: Vector2D, size: Vector2D, texture?: string) {
        super(pos, size, texture);
        this.tank = new FluidTank(Basic_Distiller.capacitymax);
    }
    public Insert(flu: Fluid, cap: number): number {
        return this.tank.Insert(flu, cap);
    }

}

class Fluid {
    public static Empty = new Fluid();
    public fluidtype: String;
    constructor(fluid?: String) {
        this.fluidtype = fluid || "Empty";
    }

}

class FluidTank {
    public maxcapacity: number;
    public fluid: Fluid;
    public capacity: number = 0;
    constructor(cap: number) {
        this.maxcapacity = cap;
        this.fluid = Fluid.Empty;
    }
    public clear(): void {
        this.fluid = Fluid.Empty;
        this.capacity = 0;
    }
    public isEmpty(): boolean {
        if (this.fluid === Fluid.Empty) {
            return true;
        }
        return false;
    }
    public Insert(flu: Fluid, cap: number): number {
        if (this.isEmpty) {
            this.fluid = flu; // Sets fluid type if tank currently empty
        }
        if (this.fluid != flu) {
            return 0;
        }

        this.capacity = this.capacity + cap;
        if (this.capacity > this.maxcapacity) {
            const val = this.capacity - this.maxcapacity;
            this.capacity = this.maxcapacity;
            return cap - val;
        }
        return cap;
    }

    /**
     * Transfer;
     * BETA FUNCTION JUST FOR TESTING
     */
    public Transfer(tank: FluidTank, num: number) {

        if (this.capacity - num < 0) { // Fixes too much num
            num = this.capacity;
        }
        this.capacity = this.capacity - tank.Insert(this.fluid, num);
        console.log(this.capacity);
        if (this.capacity === 0) {
            this.fluid = Fluid.Empty;
        }
    }
    /**
     * printVal;
     * Used to print the capacity+fluidtype
     */
    public printVal(): void {
        if (this.isEmpty()) {
            console.log(`This fluid tank is empty`);
            return;
        }
        console.log(`This fluid tank contains ${this.capacity} units of ${this.fluid.fluidtype}`);
    }
}

class Pipe {

    public tank: FluidTank = new FluidTank(96);

    constructor() {

    }

}

function tickpipes() {
    const processarr: any = [];
    // First create array of transfer materials

    processarr[processarr.length] = { target: 0, reciver: 1, tamount: pipes[0].tank.capacity, ramount: pipes[1].tank.capacity}; // A-B
    processarr[processarr.length] = { target: 1, reciver: 0, tamount: pipes[1].tank.capacity, ramount: pipes[0].tank.capacity}; // B-A
    processarr[processarr.length] = { target: 1, reciver: 2, tamount: pipes[1].tank.capacity, ramount: pipes[2].tank.capacity}; // B-C
    processarr[processarr.length] = { target: 2, reciver: 1, tamount: pipes[2].tank.capacity, ramount: pipes[1].tank.capacity}; // C-B

    // Now transfer
    for (let i = 0; i < processarr.length; i++) {
        if (processarr[i].ramount < processarr[i].tamount) {
            if (processarr[i].ramount + processarr[i].tamount * 0.01 > processarr[i].tamount) {

            } else {
                pipes[processarr[i].target].tank.Transfer(pipes[processarr[i].reciver].tank, processarr[i].tamount * 0.01);
            }
        }

    }

    console.table([pipes[0].tank, pipes[1].tank, pipes[2].tank]);

}

let pipes: Pipe[] = [];
for (let i = 0; i < 3; i++) {
    pipes[i] = new Pipe();
}

let y = new Vector2D(1, 2);
// var m = new Basic_Machine(y, y);
// console.log(m);

/*var u: Vector2D[] = [y, new Vector2D(2, 3)];
var c = new Complex_Machine(y, u);
console.log(c);
*/

let gx = new Basic_Distiller(y, y);
gx.Insert(new Fluid("Apple sauce"), 55);
gx.tank.printVal();
let gy = new Basic_Distiller(y, y);

function redrawdistillers() {
    console.clear();
    console.log("GX");
    console.table(gx);
    console.table(gx.tank);
    console.log("GY");
    console.table(gy);
    console.table(gy.tank);
}
redrawdistillers();
