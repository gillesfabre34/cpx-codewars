"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageDeclarationChildren = void 0;
var infos_model_1 = require("./infos.model");
/**
 * We are forced to use PascalCase for the properties
 * java-parser returns PascalCase properties
 */
var PackageDeclarationChildren = /** @class */ (function () {
    function PackageDeclarationChildren() {
        this.Dot = [new infos_model_1.Infos()];
        this.Identifier = [new infos_model_1.Infos()];
        this.Package = [new infos_model_1.Infos()];
        this.Semicolon = [new infos_model_1.Infos()];
    }
    return PackageDeclarationChildren;
}());
exports.PackageDeclarationChildren = PackageDeclarationChildren;
