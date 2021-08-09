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
    var _a;
    var identifier = children.Identifier;
    var formalParameterList = children.formalParameterList;
    return __spreadArrays(identifier.map(function (e) { return cst_to_ast_1.cstToAst(e, 'identifier'); }), [].concat.apply([], (_a = formalParameterList === null || formalParameterList === void 0 ? void 0 : formalParameterList.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []));
}
exports.run = run;
