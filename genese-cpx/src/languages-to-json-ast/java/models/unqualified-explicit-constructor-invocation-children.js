"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnqualifiedExplicitConstructorInvocationChildren = void 0;
var infos_model_1 = require("./infos.model");
var argument_list_model_1 = require("./argument-list.model");
var UnqualifiedExplicitConstructorInvocationChildren = /** @class */ (function () {
    function UnqualifiedExplicitConstructorInvocationChildren() {
        this.Super = [new infos_model_1.Infos()];
        this.argumentList = [new argument_list_model_1.ArgumentList()];
    }
    return UnqualifiedExplicitConstructorInvocationChildren;
}());
exports.UnqualifiedExplicitConstructorInvocationChildren = UnqualifiedExplicitConstructorInvocationChildren;
