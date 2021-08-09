"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryOperatorsPrecedence = void 0;
var syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
exports.binaryOperatorsPrecedence = [
    [syntax_kind_enum_1.SyntaxKind.EqualsToken, syntax_kind_enum_1.SyntaxKind.PlusEqualsToken, syntax_kind_enum_1.SyntaxKind.MinusEqualsToken, syntax_kind_enum_1.SyntaxKind.AsteriskEqualsToken, syntax_kind_enum_1.SyntaxKind.SlashEqualsToken, syntax_kind_enum_1.SyntaxKind.PercentEqualsToken, syntax_kind_enum_1.SyntaxKind.AmpersandEqualsToken, syntax_kind_enum_1.SyntaxKind.CaretEqualsToken, syntax_kind_enum_1.SyntaxKind.BarEqualsToken, syntax_kind_enum_1.SyntaxKind.LessThanLessThanEqualsToken, syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanEqualsToken, syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken],
    [syntax_kind_enum_1.SyntaxKind.QuestionToken, syntax_kind_enum_1.SyntaxKind.ColonToken],
    [syntax_kind_enum_1.SyntaxKind.BarBarToken],
    [syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken],
    [syntax_kind_enum_1.SyntaxKind.BarToken],
    [syntax_kind_enum_1.SyntaxKind.CaretToken],
    [syntax_kind_enum_1.SyntaxKind.AmpersandToken],
    [syntax_kind_enum_1.SyntaxKind.EqualsEqualsToken, syntax_kind_enum_1.SyntaxKind.ExclamationEqualsToken],
    [syntax_kind_enum_1.SyntaxKind.LessThanToken, syntax_kind_enum_1.SyntaxKind.LessThanEqualsToken, syntax_kind_enum_1.SyntaxKind.GreaterThanToken, syntax_kind_enum_1.SyntaxKind.GreaterThanEqualsToken],
    [syntax_kind_enum_1.SyntaxKind.LessThanLessThanToken, syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanToken, syntax_kind_enum_1.SyntaxKind.GreaterThanGreaterThanGreaterThanToken],
    [syntax_kind_enum_1.SyntaxKind.PlusToken, syntax_kind_enum_1.SyntaxKind.MinusToken],
    [syntax_kind_enum_1.SyntaxKind.AsteriskToken, syntax_kind_enum_1.SyntaxKind.SlashToken, syntax_kind_enum_1.SyntaxKind.PercentToken],
];
