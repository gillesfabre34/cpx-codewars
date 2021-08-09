"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportDeclarationElement = void 0;
var location_model_1 = require("./location.model");
var import_children_model_1 = require("./import-children.model");
var ImportDeclarationElement = /** @class */ (function () {
    function ImportDeclarationElement() {
        this.name = '';
        this.children = new import_children_model_1.ImportChildren();
        this.location = new location_model_1.Location();
    }
    return ImportDeclarationElement;
}());
exports.ImportDeclarationElement = ImportDeclarationElement;
