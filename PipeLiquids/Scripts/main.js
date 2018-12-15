"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Vector2D.prototype.toArray = function () {
        var retarr = [];
        retarr[0] = this.x;
        retarr[1] = this.y;
        return (retarr);
    };
    return Vector2D;
}());
;
var Machine = /** @class */ (function () {
    function Machine(pos) {
        this.position = pos;
    }
    return Machine;
}());
var Basic_Machine = /** @class */ (function (_super) {
    __extends(Basic_Machine, _super);
    function Basic_Machine(pos, size, texture) {
        var _this = _super.call(this, pos) || this;
        _this.size = size;
        _this.texture = texture || "/Content/DefaultTexture.png";
        return _this;
    }
    return Basic_Machine;
}(Machine));
var Complex_Machine = /** @class */ (function (_super) {
    __extends(Complex_Machine, _super);
    function Complex_Machine(pos, size, texture) {
        var _this = _super.call(this, pos) || this;
        _this.size = size;
        _this.texture = texture || "/Content/DefaultTexture.png";
        return _this;
    }
    return Complex_Machine;
}(Machine));
var Basic_Distiller = /** @class */ (function (_super) {
    __extends(Basic_Distiller, _super);
    function Basic_Distiller(pos, size, texture) {
        var _this = _super.call(this, pos, size, texture) || this;
        _this.tank = new FluidTank(Basic_Distiller.capacitymax);
        return _this;
    }
    Basic_Distiller.prototype.Insert = function (flu, cap) {
        return this.tank.Insert(flu, cap);
    };
    Basic_Distiller.capacitymax = 100;
    return Basic_Distiller;
}(Basic_Machine));
var Fluid = /** @class */ (function () {
    function Fluid(fluid) {
        this.fluidtype = fluid || "Empty";
    }
    Fluid.Empty = new Fluid();
    return Fluid;
}());
var FluidTank = /** @class */ (function () {
    function FluidTank(cap) {
        this.capacity = 0;
        this.maxcapacity = cap;
        this.fluid = Fluid.Empty;
    }
    FluidTank.prototype.clear = function () {
        this.fluid = Fluid.Empty;
        this.capacity = 0;
    };
    FluidTank.prototype.isEmpty = function () {
        if (this.fluid == Fluid.Empty) {
            return true;
        }
        return false;
    };
    FluidTank.prototype.Insert = function (flu, cap) {
        if (this.isEmpty) {
            this.fluid = flu; //Sets fluid type if tank currently empty
        }
        if (this.fluid != flu) {
            return 0;
        }
        this.capacity = this.capacity + cap;
        if (this.capacity > this.maxcapacity) {
            var val = this.capacity - this.maxcapacity;
            this.capacity = this.maxcapacity;
            return cap - val;
        }
        return cap;
    };
    /**
     * Transfer;
     * BETA FUNCTION JUST FOR TESTING
     */
    FluidTank.prototype.Transfer = function (tank, num) {
        if (this.capacity - num < 0) { //Fixes too much num
            num = this.capacity;
        }
        this.capacity = this.capacity - tank.Insert(this.fluid, num);
        console.log(this.capacity);
        if (this.capacity == 0) {
            this.fluid = Fluid.Empty;
        }
    };
    /**
     * printVal;
     * Used to print the capacity+fluidtype
     */
    FluidTank.prototype.printVal = function () {
        if (this.isEmpty()) {
            console.log("This fluid tank is empty");
            return;
        }
        console.log("This fluid tank contains " + this.capacity + " units of " + this.fluid.fluidtype);
    };
    return FluidTank;
}());
var Pipe = /** @class */ (function () {
    function Pipe() {
        this.tank = new FluidTank(96);
    }
    return Pipe;
}());
function tickpipes() {
    var processarr = [];
    //First create array of transfer materials
    processarr[processarr.length] = { target: 0, reciver: 1, amount: pipes[0].tank.capacity / 2 }; //A-B
    processarr[processarr.length] = { target: 1, reciver: 0, amount: pipes[1].tank.capacity / 2 / 2 }; //B-A
    processarr[processarr.length] = { target: 1, reciver: 2, amount: pipes[1].tank.capacity / 2 / 2 }; //B-C
    processarr[processarr.length] = { target: 2, reciver: 1, amount: pipes[2].tank.capacity / 2 }; //C-B
    //Now transfer
    for (var i = 0; i < processarr.length; i++) {
        pipes[processarr[i].target].tank.Transfer(pipes[processarr[i].reciver].tank, processarr[i].amount);
    }
    console.table([pipes[0].tank, pipes[1].tank, pipes[2].tank]);
}
var pipes = [];
for (var i = 0; i < 3; i++) {
    pipes[i] = new Pipe();
}
var y = new Vector2D(1, 2);
//var m = new Basic_Machine(y, y);
//console.log(m);
/*var u: Vector2D[] = [y, new Vector2D(2, 3)];
var c = new Complex_Machine(y, u);
console.log(c);
*/
var gx = new Basic_Distiller(y, y);
gx.Insert(new Fluid("Apple sauce"), 55);
gx.tank.printVal();
var gy = new Basic_Distiller(y, y);
function redrawdistillers() {
    console.clear();
    console.log("GX");
    console.table(gx);
    console.table(gx.tank);
    console.log("GY");
    console.table(gy);
    console.table(gy.tank);
}
;
redrawdistillers();
//# sourceMappingURL=main.js.map