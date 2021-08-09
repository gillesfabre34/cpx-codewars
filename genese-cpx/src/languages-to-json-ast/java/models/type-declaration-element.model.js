"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDeclarationElement = void 0;
var location_model_1 = require("./location.model");
var type_declaration_children_model_1 = require("./type-declaration-children.model");
var TypeDeclarationElement = /** @class */ (function () {
    function TypeDeclarationElement() {
        this.name = '';
        this.children = new type_declaration_children_model_1.TypeDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return TypeDeclarationElement;
}());
exports.TypeDeclarationElement = TypeDeclarationElement;
