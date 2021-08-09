"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimExprs = void 0;
var location_model_1 = require("./location.model");
var dim_exprs_children_model_1 = require("./dim-exprs-children.model");
var DimExprs = /** @class */ (function () {
    function DimExprs() {
        this.name = '';
        this.children = new dim_exprs_children_model_1.DimExprsChildren();
        this.location = new location_model_1.Location();
    }
    return DimExprs;
}());
exports.DimExprs = DimExprs;
