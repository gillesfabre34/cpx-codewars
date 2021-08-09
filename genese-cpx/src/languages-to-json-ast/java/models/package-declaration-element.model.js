"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageDeclarationElement = void 0;
var location_model_1 = require("./location.model");
var package_declaration_children_model_1 = require("./package-declaration-children.model");
var PackageDeclarationElement = /** @class */ (function () {
    function PackageDeclarationElement() {
        this.name = '';
        this.children = new package_declaration_children_model_1.PackageDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return PackageDeclarationElement;
}());
exports.PackageDeclarationElement = PackageDeclarationElement;
