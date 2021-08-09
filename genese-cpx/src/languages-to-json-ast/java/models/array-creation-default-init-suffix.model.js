"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCreationDefaultInitSuffix = void 0;
var location_model_1 = require("./location.model");
var array_creation_default_init_suffix_children_model_1 = require("./array-creation-default-init-suffix-children.model");
var ArrayCreationDefaultInitSuffix = /** @class */ (function () {
    function ArrayCreationDefaultInitSuffix() {
        this.name = '';
        this.children = new array_creation_default_init_suffix_children_model_1.ArrayCreationDefaultInitSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return ArrayCreationDefaultInitSuffix;
}());
exports.ArrayCreationDefaultInitSuffix = ArrayCreationDefaultInitSuffix;
