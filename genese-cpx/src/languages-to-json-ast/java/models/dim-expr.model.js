"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimExpr = void 0;
var location_model_1 = require("./location.model");
var dim_expr_children_model_1 = require("./dim-expr-children.model");
var DimExpr = /** @class */ (function () {
    function DimExpr() {
        this.name = '';
        this.children = new dim_expr_children_model_1.DimExprChildren();
        this.location = new location_model_1.Location();
    }
    return DimExpr;
}());
exports.DimExpr = DimExpr;
