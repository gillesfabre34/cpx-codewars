"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplicitConstructorInvocation = void 0;
var location_model_1 = require("./location.model");
var explicit_constructor_invocation_children_1 = require("./explicit-constructor-invocation-children");
var ExplicitConstructorInvocation = /** @class */ (function () {
    function ExplicitConstructorInvocation() {
        this.name = '';
        this.children = new explicit_constructor_invocation_children_1.ExplicitConstructorInvocationChildren();
        this.location = new location_model_1.Location();
    }
    return ExplicitConstructorInvocation;
}());
exports.ExplicitConstructorInvocation = ExplicitConstructorInvocation;
