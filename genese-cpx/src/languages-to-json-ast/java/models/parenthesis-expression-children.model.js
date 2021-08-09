"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParenthesisExpressionChildren = void 0;
var expression_model_1 = require("./expression.model");
var ParenthesisExpressionChildren = /** @class */ (function () {
    function ParenthesisExpressionChildren() {
        this.expression = [new expression_model_1.Expression()];
    }
    return ParenthesisExpressionChildren;
}());
exports.ParenthesisExpressionChildren = ParenthesisExpressionChildren;
