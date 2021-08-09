"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var arrayCreationExplicitInitSuffix = children.arrayCreationExplicitInitSuffix;
    var primitiveType = children.primitiveType;
    var classOrInterfaceType = children.classOrInterfaceType;
    var arrayCreationDefaultInitSuffix = children.arrayCreationDefaultInitSuffix;
    var classOrInterfaceTypeAst = [].concat.apply([], (_a = classOrInterfaceType === null || classOrInterfaceType === void 0 ? void 0 : classOrInterfaceType.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []);
    var arrayCreationDefaultInitSuffixAst = [].concat.apply([], (_b = arrayCreationDefaultInitSuffix === null || arrayCreationDefaultInitSuffix === void 0 ? void 0 : arrayCreationDefaultInitSuffix.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []);
    var primitiveTypeAst = [].concat.apply([], (_c = primitiveType === null || primitiveType === void 0 ? void 0 : primitiveType.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _c !== void 0 ? _c : []);
    var dimExprs = (_d = arrayCreationDefaultInitSuffixAst === null || arrayCreationDefaultInitSuffixAst === void 0 ? void 0 : arrayCreationDefaultInitSuffixAst.find(function (e) { return e.kind === 'DimExprs'; })) === null || _d === void 0 ? void 0 : _d.children;
    return __spreadArrays([].concat.apply([], (_e = arrayCreationExplicitInitSuffix === null || arrayCreationExplicitInitSuffix === void 0 ? void 0 : arrayCreationExplicitInitSuffix.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _e !== void 0 ? _e : []), [
        createElementAccess(__spreadArrays(classOrInterfaceTypeAst, primitiveTypeAst), dimExprs)
    ]);
}
exports.run = run;
/**
 * Create Element Access Expression Ast Node
 * @param  {any} classOrInterfaceTypeAst
 * @param  {any} dimExprs
 * @returns any
 */
function createElementAccess(classOrInterfaceTypeAst, dimExprs) {
    var _a, _b, _c, _d, _e;
    if (!dimExprs)
        return undefined;
    if (dimExprs.length === 1) {
        return {
            kind: 'ElementAccessExpression',
            start: (_a = classOrInterfaceTypeAst[0]) === null || _a === void 0 ? void 0 : _a.start,
            end: (_b = dimExprs[0]) === null || _b === void 0 ? void 0 : _b.end,
            pos: (_c = classOrInterfaceTypeAst[0]) === null || _c === void 0 ? void 0 : _c.pos,
            children: [
                classOrInterfaceTypeAst.find(function (e) { return e.kind === 'Identifier'; }),
                dimExprs[0]
            ]
        };
    }
    else {
        var dimExpr = dimExprs.pop();
        return {
            kind: 'ElementAccessExpression',
            start: (_d = classOrInterfaceTypeAst[0]) === null || _d === void 0 ? void 0 : _d.start,
            pos: (_e = classOrInterfaceTypeAst[0]) === null || _e === void 0 ? void 0 : _e.pos,
            end: dimExpr === null || dimExpr === void 0 ? void 0 : dimExpr.end,
            children: [__assign({}, createElementAccess(classOrInterfaceTypeAst, dimExprs)), dimExpr]
        };
    }
}
