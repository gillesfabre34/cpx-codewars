"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var cst_to_ast_1 = require("../cst-to-ast");
// @ts-ignore
function run(cstNode, children) {
    var _a, _b, _c;
    var argumentList = children.argumentList;
    var classOrInterfaceTypeToInstantiate = children.classOrInterfaceTypeToInstantiate;
    var classBody = children.classBody;
    return {
        kind: 'Keyword',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: __spreadArrays([].concat.apply([], (_a = classOrInterfaceTypeToInstantiate === null || classOrInterfaceTypeToInstantiate === void 0 ? void 0 : classOrInterfaceTypeToInstantiate.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []), [].concat.apply([], (_b = argumentList === null || argumentList === void 0 ? void 0 : argumentList.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []), [].concat.apply([], (_c = classBody === null || classBody === void 0 ? void 0 : classBody.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _c !== void 0 ? _c : []))
    };
}
exports.run = run;
