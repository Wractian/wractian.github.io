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
        this.x = x;
        this.y = y;
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
        _this.texture = texture;
        return _this;
    }
    return Basic_Machine;
}(Machine));
var Complex_Machine = /** @class */ (function (_super) {
    __extends(Complex_Machine, _super);
    function Complex_Machine(pos, size, texture) {
        var _this = _super.call(this, pos) || this;
        _this.size = size;
        _this.texture = texture;
        return _this;
    }
    return Complex_Machine;
}(Machine));
var y = new Vector2D(1, 2);
var m = new Basic_Machine(y, y, "ooga");
console.log(m);
var u = [y, new Vector2D(2, 3)];
var c = new Complex_Machine(y, u, "ooga");
console.log(c);
//# sourceMappingURL=main.js.map