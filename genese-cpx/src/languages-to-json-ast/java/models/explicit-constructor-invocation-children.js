"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplicitConstructorInvocationChildren = void 0;
var unqualified_explicit_constructor_invocation_1 = require("./unqualified-explicit-constructor-invocation");
var ExplicitConstructorInvocationChildren = /** @class */ (function () {
    function ExplicitConstructorInvocationChildren() {
        this.unqualifiedExplicitConstructorInvocation = [new unqualified_explicit_constructor_invocation_1.UnqualifiedExplicitConstructorInvocation()];
    }
    return ExplicitConstructorInvocationChildren;
}());
exports.ExplicitConstructorInvocationChildren = ExplicitConstructorInvocationChildren;
