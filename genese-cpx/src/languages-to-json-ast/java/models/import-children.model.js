"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportChildren = void 0;
var infos_model_1 = require("./infos.model");
var package_or_type_name_element_model_1 = require("./package-or-type-name-element.model");
/**
 * We are forced to write on PascalCase some properties
 * java-parser returns also PascalCase properties
 */
var ImportChildren = /** @class */ (function () {
    function ImportChildren() {
        this.Import = [new infos_model_1.Infos()];
        this.packageOrTypeName = [new package_or_type_name_element_model_1.PackageOrTypeNameElement()];
        this.Semicolon = [new infos_model_1.Infos()];
    }
    return ImportChildren;
}());
exports.ImportChildren = ImportChildren;
