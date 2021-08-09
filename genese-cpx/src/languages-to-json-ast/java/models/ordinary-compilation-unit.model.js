"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdinaryCompilationUnit = void 0;
var location_model_1 = require("./location.model");
var ordinary_compilation_unit_children_model_1 = require("./ordinary-compilation-unit-children.model");
var OrdinaryCompilationUnit = /** @class */ (function () {
    function OrdinaryCompilationUnit() {
        this.name = '';
        this.children = new ordinary_compilation_unit_children_model_1.OrdinaryCompilationUnitChildren();
        this.location = new location_model_1.Location();
    }
    return OrdinaryCompilationUnit;
}());
exports.OrdinaryCompilationUnit = OrdinaryCompilationUnit;
