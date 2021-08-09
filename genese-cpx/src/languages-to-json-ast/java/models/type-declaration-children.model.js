"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDeclarationChildren = void 0;
var class_declaration_element_model_1 = require("./class-declaration-element.model");
var interface_declaration_model_1 = require("./interface-declaration.model");
var TypeDeclarationChildren = /** @class */ (function () {
    function TypeDeclarationChildren() {
        this.classDeclaration = [new class_declaration_element_model_1.ClassDeclarationElement()];
        this.interfaceDeclaration = [new interface_declaration_model_1.InterfaceDeclaration];
    }
    return TypeDeclarationChildren;
}());
exports.TypeDeclarationChildren = TypeDeclarationChildren;
