"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableDeclaratorListChildren = void 0;
var variable_declarator_model_1 = require("./variable.declarator.model");
var VariableDeclaratorListChildren = /** @class */ (function () {
    function VariableDeclaratorListChildren() {
        this.variableDeclarator = [new variable_declarator_model_1.VariableDeclarator()];
    }
    return VariableDeclaratorListChildren;
}());
exports.VariableDeclaratorListChildren = VariableDeclaratorListChildren;
