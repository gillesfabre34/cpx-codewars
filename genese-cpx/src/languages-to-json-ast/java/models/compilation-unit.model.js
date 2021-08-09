"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilationUnit = void 0;
var location_model_1 = require("./location.model");
var compilation_unit_children_model_1 = require("./compilation-unit-children.model");
var CompilationUnit = /** @class */ (function () {
    function CompilationUnit() {
        this.name = '';
        this.children = new compilation_unit_children_model_1.CompilationUnitChildren();
        this.location = new location_model_1.Location();
    }
    return CompilationUnit;
}());
exports.CompilationUnit = CompilationUnit;
