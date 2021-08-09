"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnaryExpressionNotPlusMinus = void 0;
var location_model_1 = require("./location.model");
var unary_expression_not_plus_minus_children_model_1 = require("./unary-expression-not-plus-minus-children.model");
var UnaryExpressionNotPlusMinus = /** @class */ (function () {
    function UnaryExpressionNotPlusMinus() {
        this.name = '';
        this.children = new unary_expression_not_plus_minus_children_model_1.UnaryExpressionNotPlusMinusChildren();
        this.location = new location_model_1.Location();
    }
    return UnaryExpressionNotPlusMinus;
}());
exports.UnaryExpressionNotPlusMinus = UnaryExpressionNotPlusMinus;
