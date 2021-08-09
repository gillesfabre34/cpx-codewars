"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayAccessSuffix = void 0;
var location_model_1 = require("./location.model");
var array_access_suffix_children_model_1 = require("./array-access-suffix-children.model");
var ArrayAccessSuffix = /** @class */ (function () {
    function ArrayAccessSuffix() {
        this.name = '';
        this.children = new array_access_suffix_children_model_1.ArrayAccessSuffixChildren();
        this.location = new location_model_1.Location();
    }
    return ArrayAccessSuffix;
}());
exports.ArrayAccessSuffix = ArrayAccessSuffix;
