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
var core_1 = require("@genese/core");
function run(cstNode, children) {
    var _a, _b;
    var primaryPrefix = children.primaryPrefix;
    var primarySuffix = children.primarySuffix;
    var primaryPrefixAst = [].concat.apply([], (_a = primaryPrefix === null || primaryPrefix === void 0 ? void 0 : primaryPrefix.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _a !== void 0 ? _a : []);
    var primarySuffixAst = [].concat.apply([], (_b = primarySuffix === null || primarySuffix === void 0 ? void 0 : primarySuffix.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []);
    return process(cstNode, primaryPrefixAst, primarySuffixAst);
}
exports.run = run;
function process(cstNode, prefix, suffix) {
    var methodInvocationSuffix = suffix.filter(function (e) { return e.kind === 'MethodInvocationSuffix'; });
    var arrayAccessSuffix = suffix.filter(function (e) { return e.kind === 'ArrayAccessSuffix'; });
    if (Array.isArray(arrayAccessSuffix) && arrayAccessSuffix.length > 0) {
        return createElementAccess(cstNode, prefix, suffix, arrayAccessSuffix);
    }
    if (Array.isArray(methodInvocationSuffix) && methodInvocationSuffix.length > 0) {
        return handleMethodInvocationSuffix(cstNode, prefix, suffix, methodInvocationSuffix);
    }
    return handleNoMethodInvocationSuffix(prefix, suffix);
}
/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 */
function handleNoMethodInvocationSuffix(primaryPrefixAst, primarySuffixAst) {
    if (primarySuffixAst.length === 1 && primarySuffixAst[0].kind === 'ClassLiteralSuffix') {
        primaryPrefixAst.push.apply(primaryPrefixAst, primarySuffixAst.pop().children);
    }
    if (primaryPrefixAst.length > 1) {
        return __spreadArrays([
            toPropertyAccessExpression(primaryPrefixAst, false, [])
        ], primarySuffixAst);
    }
    if (primaryPrefixAst.length === 1 && primaryPrefixAst[0].kind === 'ThisKeyword') {
        return [
            toPropertyAccessExpression(__spreadArrays(primaryPrefixAst, primarySuffixAst), false, []),
        ];
    }
    if (primarySuffixAst.every(function (e) { return e.kind === 'Identifier'; }) && primarySuffixAst.every(function (e) { return e.kind === 'Identifier'; })) {
        return [
            toPropertyAccessExpression(__spreadArrays(primaryPrefixAst, primarySuffixAst), false, []),
        ];
    }
    return __spreadArrays(primaryPrefixAst, primarySuffixAst);
}
/**
 * @param  {any} cstNode
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param  {any} methodInvocationSuffix
 */
function handleMethodInvocationSuffix(cstNode, primaryPrefixAst, primarySuffixAst, methodInvocationSuffix) {
    var identifierSuffix = primarySuffixAst.filter(function (e) { return e.kind === 'Identifier'; });
    var thisKeyword = primaryPrefixAst.find(function (e) { return e.kind === 'ThisKeyword'; });
    var obj = {
        kind: 'CallExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
    };
    if (thisKeyword) {
        return getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix, obj);
    }
    return getOtherCasesChildren(primaryPrefixAst, primarySuffixAst, methodInvocationSuffix, obj);
}
/**
 * @param  {any} methodInvocationSuffix
 * @param  {any} thisKeyword
 * @param  {any} identifierSuffix
 * @param  {any} obj
 * @returns any
 */
function getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix, obj) {
    return __assign(__assign({}, obj), { children: __spreadArrays([
            toPropertyAccessExpression(__spreadArrays([
                thisKeyword
            ], identifierSuffix), true, core_1.clone(methodInvocationSuffix))
        ], getMethodInvocationSuffixChildren(methodInvocationSuffix)) });
}
/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param methodInvocationSuffix
 * @param  {any} obj
 * @returns any
 */
function getOtherCasesChildren(primaryPrefixAst, primarySuffixAst, methodInvocationSuffix, obj) {
    return __assign(__assign({}, obj), { children: __spreadArrays([
            toPropertyAccessExpression(__spreadArrays(getNewExpression(primaryPrefixAst), primaryPrefixAst.filter(function (e) { return e.kind === 'Identifier'; }), primarySuffixAst.filter(function (e) { return e.kind === 'Identifier'; })), true, core_1.clone(methodInvocationSuffix))
        ], primarySuffixAst.filter(function (e) { return e.kind === 'ClassLiteralSuffix'; }), getMethodInvocationSuffixChildren(methodInvocationSuffix)) });
}
/** Get all MethodInvocationSuffix with children
 * @param  {} methodInvocationSuffixList
 */
function getMethodInvocationSuffixChildren(methodInvocationSuffixList) {
    var childrenList = [];
    if (Array.isArray(methodInvocationSuffixList)) {
        methodInvocationSuffixList.forEach(function (methodInvocationSuffix) {
            if (Array.isArray(methodInvocationSuffix.children) && methodInvocationSuffix.children.length > 0) {
                childrenList.push.apply(childrenList, methodInvocationSuffix.children);
            }
        });
    }
    return childrenList;
}
/** Get newExpression Ast node
 * @param  {any} primaryPrefixAst
 * @returns any
 */
function getNewExpression(primaryPrefixAst) {
    var newExpression = primaryPrefixAst.filter(function (e) { return e.kind === 'NewExpression'; });
    if (Array.isArray(newExpression) && newExpression.length) {
        return __spreadArrays(primaryPrefixAst.find(function (e) { return e.kind === 'NewExpression'; }).children);
    }
    return [];
}
/**
 * @param  {} primaryPrefixAst
 * @param primarySuffixAst
 * @param  {} arrayAccessSuffixList
 * @returns any
 */
function createElementAccess(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList) {
    var _a, _b, _c;
    if (arrayAccessSuffixList.length === 1) {
        return singleAccessCase(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList);
    }
    var arrayAccessSuffix = arrayAccessSuffixList.pop();
    var last = (_a = arrayAccessSuffix.children) === null || _a === void 0 ? void 0 : _a.find(function (e) { return e.kind === 'Identifier' || 'Literal'; });
    return {
        kind: 'ElementAccessExpression',
        start: (_b = primaryPrefixAst[0]) === null || _b === void 0 ? void 0 : _b.start,
        pos: (_c = primaryPrefixAst[0]) === null || _c === void 0 ? void 0 : _c.pos,
        end: arrayAccessSuffix === null || arrayAccessSuffix === void 0 ? void 0 : arrayAccessSuffix.end,
        children: [
            __assign({}, createElementAccess(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList)),
            last
        ]
    };
}
function singleAccessCase(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList) {
    var _a, _b, _c;
    primarySuffixAst.pop();
    return {
        kind: 'ElementAccessExpression',
        start: (_a = primaryPrefixAst[0]) === null || _a === void 0 ? void 0 : _a.start,
        end: (_b = arrayAccessSuffixList[0]) === null || _b === void 0 ? void 0 : _b.end,
        pos: (_c = primaryPrefixAst[0]) === null || _c === void 0 ? void 0 : _c.pos,
        children: __spreadArrays([].concat.apply([], [process(cstNode, primaryPrefixAst, primarySuffixAst)]), arrayAccessSuffixList[0].children.filter(function (e) { return e.kind === 'Identifier' || 'Literal'; }))
    };
}
/**
 * @param  {any[]} identifiers
 * @param  {} isFunctionCall=false
 * @param  {any[]} methodInvocationSuffix
 * @returns any
 */
function toPropertyAccessExpression(identifiers, isFunctionCall, methodInvocationSuffix) {
    var _a, _b;
    if (isFunctionCall === void 0) { isFunctionCall = false; }
    if (!identifiers || identifiers.length === 0)
        return undefined;
    if (identifiers.length === 1 && methodInvocationSuffix.length === 0) {
        return identifiers[0];
    }
    if (identifiers.length === 1) {
        return __assign({ type: 'function' }, identifiers[0]);
    }
    var last = identifiers.pop();
    if (isFunctionCall) {
        return isFunctionCallCase(identifiers, last, methodInvocationSuffix);
    }
    return {
        kind: 'PropertyAccessExpression',
        start: (_a = identifiers[0]) === null || _a === void 0 ? void 0 : _a.start,
        end: last === null || last === void 0 ? void 0 : last.end,
        pos: (_b = identifiers[0]) === null || _b === void 0 ? void 0 : _b.pos,
        children: [
            toPropertyAccessExpression(identifiers, false, methodInvocationSuffix),
            last
        ].filter(function (e) { return e; })
    };
}
function isFunctionCallCase(identifiers, last, methodInvocationSuffix) {
    var _a, _b;
    methodInvocationSuffix.pop();
    var start, pos;
    if (identifiers.length === 0) {
        start = last === null || last === void 0 ? void 0 : last.start;
        pos = last === null || last === void 0 ? void 0 : last.pos;
    }
    else {
        start = (_a = identifiers[0]) === null || _a === void 0 ? void 0 : _a.start;
        pos = (_b = identifiers[0]) === null || _b === void 0 ? void 0 : _b.pos;
    }
    return {
        kind: 'PropertyAccessExpression',
        start: start,
        end: last === null || last === void 0 ? void 0 : last.end,
        pos: pos,
        children: [
            toPropertyAccessExpression(identifiers, methodInvocationSuffix.length > 0, methodInvocationSuffix),
            __assign(__assign({}, last), { type: 'function' })
        ].filter(function (e) { return e; })
    };
}
