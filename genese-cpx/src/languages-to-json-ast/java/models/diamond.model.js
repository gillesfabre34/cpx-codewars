"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diamond = void 0;
var location_model_1 = require("./location.model");
var diamond_children_model_1 = require("./diamond-children.model");
var Diamond = /** @class */ (function () {
    function Diamond() {
        this.name = '';
        this.children = new diamond_children_model_1.DiamondChildren();
        this.location = new location_model_1.Location();
    }
    return Diamond;
}());
exports.Diamond = Diamond;
