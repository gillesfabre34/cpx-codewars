"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageOrTypeNameChildren = void 0;
var infos_model_1 = require("./infos.model");
var PackageOrTypeNameChildren = /** @class */ (function () {
    function PackageOrTypeNameChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.Dot = [new infos_model_1.Infos()];
    }
    return PackageOrTypeNameChildren;
}());
exports.PackageOrTypeNameChildren = PackageOrTypeNameChildren;
