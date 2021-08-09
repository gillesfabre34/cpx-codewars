"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimExprChildren = void 0;
var expression_model_1 = require("./expression.model");
var DimExprChildren = /** @class */ (function () {
    function DimExprChildren() {
        this.expression = [new expression_model_1.Expression()];
    }
    return DimExprChildren;
}());
exports.DimExprChildren = DimExprChildren;
