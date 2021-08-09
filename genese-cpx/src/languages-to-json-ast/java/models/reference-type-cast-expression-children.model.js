"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceTypeCastExpressionChildren = void 0;
var reference_type_model_1 = require("./reference-type.model");
var unary_expression_not_plus_minus_model_1 = require("./unary-expression-not-plus-minus.model");
var lambda_expression_model_1 = require("./lambda-expression.model");
var ReferenceTypeCastExpressionChildren = /** @class */ (function () {
    function ReferenceTypeCastExpressionChildren() {
        this.referenceType = [new reference_type_model_1.ReferenceType()];
        this.unaryExpressionNotPlusMinus = [new unary_expression_not_plus_minus_model_1.UnaryExpressionNotPlusMinus()];
        this.lambdaExpression = [new lambda_expression_model_1.LambdaExpression()];
    }
    return ReferenceTypeCastExpressionChildren;
}());
exports.ReferenceTypeCastExpressionChildren = ReferenceTypeCastExpressionChildren;
