"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunctionKind = void 0;
var ts_morph_1 = require("ts-morph");
function isFunctionKind(kind) {
    return [ts_morph_1.SyntaxKind.FunctionDeclaration, ts_morph_1.SyntaxKind.ArrowFunction, ts_morph_1.SyntaxKind.MethodDeclaration, ts_morph_1.SyntaxKind.FunctionExpression].includes(kind);
}
exports.isFunctionKind = isFunctionKind;
