"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorBodyChildren = void 0;
var block_statements_model_1 = require("./block-statements.model");
var infos_model_1 = require("./infos.model");
var explicit_constructor_invocation_1 = require("./explicit-constructor-invocation");
var ConstructorBodyChildren = /** @class */ (function () {
    function ConstructorBodyChildren() {
        this.LCurly = [new infos_model_1.Infos()];
        this.RCurly = [new infos_model_1.Infos()];
        this.blockStatements = [new block_statements_model_1.BlockStatements()];
        this.explicitConstructorInvocation = [new explicit_constructor_invocation_1.ExplicitConstructorInvocation()];
    }
    return ConstructorBodyChildren;
}());
exports.ConstructorBodyChildren = ConstructorBodyChildren;
