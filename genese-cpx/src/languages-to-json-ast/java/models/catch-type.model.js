"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchType = void 0;
var catch_type_children_model_1 = require("./catch-type-children.model");
var CatchType = /** @class */ (function () {
    function CatchType() {
        this.name = '';
        this.children = new catch_type_children_model_1.CatchTypeChildren();
        this.location = new Location();
    }
    return CatchType;
}());
exports.CatchType = CatchType;
