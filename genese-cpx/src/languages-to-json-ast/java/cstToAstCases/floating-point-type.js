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
    var _a, _b;
    var double = children.Double;
    var float = children.Float;
    return __spreadArrays([].concat((_a = double === null || double === void 0 ? void 0 : double.map(function (e) { return cst_to_ast_1.cstToAst(e, 'double'); })) !== null && _a !== void 0 ? _a : []), [].concat((_b = float === null || float === void 0 ? void 0 : float.map(function (e) { return cst_to_ast_1.cstToAst(e, 'float'); })) !== null && _b !== void 0 ? _b : []));
}
exports.run = run;
