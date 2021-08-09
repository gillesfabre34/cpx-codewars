"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionType = void 0;
var location_model_1 = require("./location.model");
var exception_type_children_model_1 = require("./exception-type-children.model");
var ExceptionType = /** @class */ (function () {
    function ExceptionType() {
        this.name = '';
        this.children = new exception_type_children_model_1.ExceptionTypeChildren();
        this.location = new location_model_1.Location();
    }
    return ExceptionType;
}());
exports.ExceptionType = ExceptionType;
