"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentListChildren = void 0;
var expression_model_1 = require("./expression.model");
var ArgumentListChildren = /** @class */ (function () {
    function ArgumentListChildren() {
        this.expression = [new expression_model_1.Expression()];
    }
    return ArgumentListChildren;
}());
exports.ArgumentListChildren = ArgumentListChildren;
