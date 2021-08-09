"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageOrTypeNameElement = void 0;
var package_or_type_name_children_model_1 = require("./package-or-type-name-children.model");
var location_model_1 = require("./location.model");
var PackageOrTypeNameElement = /** @class */ (function () {
    function PackageOrTypeNameElement() {
        this.name = '';
        this.children = new package_or_type_name_children_model_1.PackageOrTypeNameChildren();
        this.location = new location_model_1.Location();
    }
    return PackageOrTypeNameElement;
}());
exports.PackageOrTypeNameElement = PackageOrTypeNameElement;
