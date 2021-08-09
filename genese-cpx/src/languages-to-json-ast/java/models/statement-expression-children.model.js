"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementExpressionChildren = void 0;
var expression_model_1 = require("./expression.model");
var StatementExpressionChildren = /** @class */ (function () {
    function StatementExpressionChildren() {
        this.expression = [new expression_model_1.Expression()];
    }
    return StatementExpressionChildren;
}());
exports.StatementExpressionChildren = StatementExpressionChildren;
