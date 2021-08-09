"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastExpressionChildren = void 0;
var primitive_cast_expression_model_1 = require("./primitive-cast-expression.model");
var reference_type_cast_expression_model_1 = require("./reference-type-cast-expression.model");
var CastExpressionChildren = /** @class */ (function () {
    function CastExpressionChildren() {
        this.primitiveCastExpression = [new primitive_cast_expression_model_1.PrimitiveCastExpression()];
        this.referenceTypeCastExpression = [new reference_type_cast_expression_model_1.ReferenceTypeCastExpression()];
    }
    return CastExpressionChildren;
}());
exports.CastExpressionChildren = CastExpressionChildren;
