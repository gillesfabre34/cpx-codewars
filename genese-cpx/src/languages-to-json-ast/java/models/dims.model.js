"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dims = void 0;
var location_model_1 = require("./location.model");
var dims_children_model_1 = require("./dims-children.model");
var Dims = /** @class */ (function () {
    function Dims() {
        this.name = '';
        this.children = new dims_children_model_1.DimsChildren();
        this.location = new location_model_1.Location();
    }
    return Dims;
}());
exports.Dims = Dims;
