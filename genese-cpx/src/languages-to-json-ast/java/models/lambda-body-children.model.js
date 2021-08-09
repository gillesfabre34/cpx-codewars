"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaBodyChildren = void 0;
var block_model_1 = require("./block.model");
var expression_model_1 = require("./expression.model");
var LambdaBodyChildren = /** @class */ (function () {
    function LambdaBodyChildren() {
        this.block = [new block_model_1.Block()];
        this.expression = [new expression_model_1.Expression()];
    }
    return LambdaBodyChildren;
}());
exports.LambdaBodyChildren = LambdaBodyChildren;
