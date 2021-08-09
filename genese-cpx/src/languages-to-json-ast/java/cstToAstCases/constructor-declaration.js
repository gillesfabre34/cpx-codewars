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
function run(cstNode, children) {
    var constructorBody = children.constructorBody;
    var constructorDeclarator = children.constructorDeclarator;
    var constructorDeclaratorAst = [].concat.apply([], constructorDeclarator.map(function (e) { return cst_to_ast_1.cstToAst(e); }));
    var name = constructorDeclaratorAst.find(function (e) { return e.kind === 'Identifier'; }).name;
    return {
        kind: 'Constructor',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        name: name,
        children: __spreadArrays([].concat.apply([], constructorDeclaratorAst.filter(function (e) { return e.kind === 'Parameter'; })), [].concat.apply([], constructorBody.map(function (e) { return cst_to_ast_1.cstToAst(e); })))
    };
}
exports.run = run;
