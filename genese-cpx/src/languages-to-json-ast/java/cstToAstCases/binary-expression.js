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
var bin_ops_precedence_1 = require("../const/bin-ops-precedence");
// @ts-ignore
function run(cstNode, children) {
    var unaryExpressions = children.unaryExpression;
    var binaryOperators = children.BinaryOperator;
    var less = children.Less;
    var greater = children.Greater;
    var assignmentOperator = children.AssignmentOperator;
    var unaryExpressionsAst = __spreadArrays([].concat.apply([], unaryExpressions.map(function (e) { return cst_to_ast_1.cstToAst(e); })));
    if (binaryOperators || less || greater) {
        return binaryOperatorsCase(binaryOperators, less, greater, unaryExpressionsAst);
    }
    else if (assignmentOperator) {
        return assignmentOperatorCase(cstNode, children, unaryExpressionsAst, assignmentOperator);
    }
    else {
        return __spreadArrays(unaryExpressionsAst);
    }
}
exports.run = run;
function binaryOperatorsCase(binaryOperators, less, greater, unaryExpressionsAst) {
    var binaryOperatorsAst = constructBinaryOperatorsAst(binaryOperators, less, greater);
    var alternate = [];
    for (var i = 0; i < binaryOperatorsAst.length; i++) {
        alternate.push(unaryExpressionsAst[i], binaryOperatorsAst[i]);
    }
    alternate.push.apply(alternate, __spreadArrays(unaryExpressionsAst.slice(binaryOperatorsAst.length), binaryOperatorsAst.slice(binaryOperatorsAst.length)));
    var separatedExps = splitExpression(alternate);
    return toBinaryExpression(separatedExps.op, separatedExps.left, separatedExps.right);
}
function constructBinaryOperatorsAst(binaryOperators, less, greater) {
    var _a;
    var binaryOperatorsAst = (_a = binaryOperators === null || binaryOperators === void 0 ? void 0 : binaryOperators.map(function (e) { return cst_to_ast_1.cstToAst(e, 'binaryOperator'); })) !== null && _a !== void 0 ? _a : [];
    var lessAndGreaterAst = [];
    lessAndGreaterAst.push.apply(lessAndGreaterAst, reconstructOperators(less));
    lessAndGreaterAst.push.apply(lessAndGreaterAst, reconstructOperators(greater));
    lessAndGreaterAst.forEach(function (op) {
        binaryOperatorsAst.push({
            kind: cst_to_ast_1.getBinaryOperatorName(op.map(function (e) { return e.image; }).join('')),
            start: op[0].startOffset,
            end: op[op.length - 1].endOffset,
            pos: op[0].startOffset
        });
    });
    binaryOperatorsAst = binaryOperatorsAst.sort(function (a, b) {
        return a.start - b.start;
    });
    return binaryOperatorsAst;
}
function assignmentOperatorCase(cstNode, children, unaryExpressionsAst, assignmentOperator) {
    var _a, _b;
    var expression = children.expression;
    return {
        kind: 'BinaryExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: __spreadArrays(unaryExpressionsAst, (_a = assignmentOperator === null || assignmentOperator === void 0 ? void 0 : assignmentOperator.map(function (e) { return cst_to_ast_1.cstToAst(e, 'assignmentOperator'); })) !== null && _a !== void 0 ? _a : [], [].concat.apply([], (_b = expression === null || expression === void 0 ? void 0 : expression.map(function (e) { return cst_to_ast_1.cstToAst(e); })) !== null && _b !== void 0 ? _b : []))
    };
}
function reconstructOperators(elements) {
    if (!elements || elements.length === 0)
        return [];
    var result = [];
    var indexes = elements.map(function (e, i) {
        var _a;
        return (e === null || e === void 0 ? void 0 : e.startOffset) + 1 === ((_a = elements[i + 1]) === null || _a === void 0 ? void 0 : _a.startOffset) ? null : i + 1;
    }).filter(function (e) { return e; });
    indexes.forEach(function (i, index) {
        var _a;
        result.push(elements.slice((_a = indexes[index - 1]) !== null && _a !== void 0 ? _a : 0, i));
    });
    return result;
}
function splitExpression(list) {
    if (list.length === 1) {
        return list[0];
    }
    var result = {
        op: undefined,
        left: undefined,
        right: undefined
    };
    bin_ops_precedence_1.binaryOperatorsPrecedence.forEach(function (ops) {
        var index = list.findIndex(function (e) { return ops.includes(e.kind); });
        if (index !== -1 && !result.op) {
            result.op = list[index];
            result.left = splitExpression(list.slice(0, index));
            result.right = splitExpression(list.slice(index + 1, list.length + 1));
        }
    });
    return result;
}
function toBinaryExpression(op, left, right) {
    var children = [
        left.op ? toBinaryExpression(left.op, left.left, left.right) : left,
        op,
        right.op ? toBinaryExpression(right.op, right.left, right.right) : right,
    ];
    var mostLeft = left;
    while (mostLeft.left) {
        mostLeft = mostLeft.left;
    }
    var mostRight = right;
    while (mostRight.right) {
        mostRight = mostRight.right;
    }
    return {
        kind: 'BinaryExpression',
        start: mostLeft.start,
        end: mostRight.end,
        pos: mostLeft.pos,
        children: children
    };
}
