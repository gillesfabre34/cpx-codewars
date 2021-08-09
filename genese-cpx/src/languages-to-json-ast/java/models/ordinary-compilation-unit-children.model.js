"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdinaryCompilationUnitChildren = void 0;
var package_declaration_element_model_1 = require("./package-declaration-element.model");
var import_declaration_element_model_1 = require("./import-declaration-element.model");
var type_declaration_element_model_1 = require("./type-declaration-element.model");
var OrdinaryCompilationUnitChildren = /** @class */ (function () {
    function OrdinaryCompilationUnitChildren() {
        this.packageDeclaration = [new package_declaration_element_model_1.PackageDeclarationElement()];
        this.importDeclaration = [new import_declaration_element_model_1.ImportDeclarationElement()];
        this.typeDeclaration = [new type_declaration_element_model_1.TypeDeclarationElement()];
    }
    return OrdinaryCompilationUnitChildren;
}());
exports.OrdinaryCompilationUnitChildren = OrdinaryCompilationUnitChildren;
