"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilationUnitChildren = void 0;
var infos_model_1 = require("./infos.model");
var ordinary_compilation_unit_model_1 = require("./ordinary-compilation-unit.model");
var CompilationUnitChildren = /** @class */ (function () {
    function CompilationUnitChildren() {
        this.ordinaryCompilationUnit = [new ordinary_compilation_unit_model_1.OrdinaryCompilationUnit()];
        this.eof = [new infos_model_1.Infos()];
    }
    return CompilationUnitChildren;
}());
exports.CompilationUnitChildren = CompilationUnitChildren;
