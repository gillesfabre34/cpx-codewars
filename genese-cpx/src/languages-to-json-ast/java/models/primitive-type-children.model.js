"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveTypeChildren = void 0;
var numeric_type_model_1 = require("./numeric-type.model");
var infos_model_1 = require("./infos.model");
var PrimitiveTypeChildren = /** @class */ (function () {
    function PrimitiveTypeChildren() {
        this.numericType = [new numeric_type_model_1.NumericType()];
        this.Boolean = [new infos_model_1.Infos()];
    }
    return PrimitiveTypeChildren;
}());
exports.PrimitiveTypeChildren = PrimitiveTypeChildren;
