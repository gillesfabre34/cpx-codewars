"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceTypeCastExpression = void 0;
var location_model_1 = require("./location.model");
var reference_type_cast_expression_children_model_1 = require("./reference-type-cast-expression-children.model");
var ReferenceTypeCastExpression = /** @class */ (function () {
    function ReferenceTypeCastExpression() {
        this.name = '';
        this.children = new reference_type_cast_expression_children_model_1.ReferenceTypeCastExpressionChildren();
        this.location = new location_model_1.Location();
    }
    return ReferenceTypeCastExpression;
}());
exports.ReferenceTypeCastExpression = ReferenceTypeCastExpression;
