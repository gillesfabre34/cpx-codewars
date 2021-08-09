"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimarySuffixChildren = void 0;
var infos_model_1 = require("./infos.model");
var method_invocation_suffix_model_1 = require("./method-invocation-suffix.model");
var class_literal_suffix_model_1 = require("./class-literal-suffix.model");
var method_reference_suffix_model_1 = require("./method-reference-suffix.model");
var array_access_suffix_model_1 = require("./array-access-suffix.model");
var PrimarySuffixChildren = /** @class */ (function () {
    function PrimarySuffixChildren() {
        this.Identifier = [new infos_model_1.Infos()];
        this.methodInvocationSuffix = [new method_invocation_suffix_model_1.MethodInvocationSuffix()];
        this.classLiteralSuffix = [new class_literal_suffix_model_1.ClassLiteralSuffix()];
        this.methodReferenceSuffix = [new method_reference_suffix_model_1.MethodReferenceSuffix()];
        this.arrayAccessSuffix = [new array_access_suffix_model_1.ArrayAccessSuffix()];
    }
    return PrimarySuffixChildren;
}());
exports.PrimarySuffixChildren = PrimarySuffixChildren;
