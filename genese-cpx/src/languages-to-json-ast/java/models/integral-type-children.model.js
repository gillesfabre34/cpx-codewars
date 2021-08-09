"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegralTypeChildren = void 0;
var infos_model_1 = require("./infos.model");
var IntegralTypeChildren = /** @class */ (function () {
    function IntegralTypeChildren() {
        this.Int = [new infos_model_1.Infos()];
        this.Byte = [new infos_model_1.Infos()];
        this.Long = [new infos_model_1.Infos()];
        this.Char = [new infos_model_1.Infos()];
        this.Short = [new infos_model_1.Infos()];
    }
    return IntegralTypeChildren;
}());
exports.IntegralTypeChildren = IntegralTypeChildren;
