"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnqualifiedExplicitConstructorInvocation = void 0;
var location_model_1 = require("./location.model");
var unqualified_explicit_constructor_invocation_children_1 = require("./unqualified-explicit-constructor-invocation-children");
var UnqualifiedExplicitConstructorInvocation = /** @class */ (function () {
    function UnqualifiedExplicitConstructorInvocation() {
        this.name = '';
        this.children = new unqualified_explicit_constructor_invocation_children_1.UnqualifiedExplicitConstructorInvocationChildren();
        this.location = new location_model_1.Location();
    }
    return UnqualifiedExplicitConstructorInvocation;
}());
exports.UnqualifiedExplicitConstructorInvocation = UnqualifiedExplicitConstructorInvocation;
