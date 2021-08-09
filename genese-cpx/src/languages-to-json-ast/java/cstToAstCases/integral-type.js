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
    var _a, _b, _c, _d, _e;
    var int = children.Int;
    var byte = children.Byte;
    var long = children.Long;
    var char = children.Char;
    var short = children.Short;
    return __spreadArrays([].concat((_a = int === null || int === void 0 ? void 0 : int.map(function (e) { return cst_to_ast_1.cstToAst(e, 'int'); })) !== null && _a !== void 0 ? _a : []), [].concat((_b = byte === null || byte === void 0 ? void 0 : byte.map(function (e) { return cst_to_ast_1.cstToAst(e, 'byte'); })) !== null && _b !== void 0 ? _b : []), [].concat((_c = long === null || long === void 0 ? void 0 : long.map(function (e) { return cst_to_ast_1.cstToAst(e, 'long'); })) !== null && _c !== void 0 ? _c : []), [].concat((_d = char === null || char === void 0 ? void 0 : char.map(function (e) { return cst_to_ast_1.cstToAst(e, 'char'); })) !== null && _d !== void 0 ? _d : []), [].concat((_e = short === null || short === void 0 ? void 0 : short.map(function (e) { return cst_to_ast_1.cstToAst(e, 'short'); })) !== null && _e !== void 0 ? _e : []));
}
exports.run = run;
