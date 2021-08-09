"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableInitializer = void 0;
var location_model_1 = require("./location.model");
var variable_initializer_children_model_1 = require("./variable-initializer-children.model");
var VariableInitializer = /** @class */ (function () {
    function VariableInitializer() {
        this.name = '';
        this.children = new variable_initializer_children_model_1.VariableInitializerChildren();
        this.location = new location_model_1.Location();
    }
    return VariableInitializer;
}());
exports.VariableInitializer = VariableInitializer;
