"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrowFunctionOfVarStatement = exports.arrowFunctionBlock = exports.getFirstDescendantByKind = exports.getFirstChildByKind = exports.getFirstChild = void 0;
var syntax_kind_enum_1 = require("../enum/syntax-kind.enum");
var arrays_util_1 = require("./arrays.util");
/**
 * Returns the first child of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
function getFirstChild(astNodeInterface) {
    var _a;
    return (_a = astNodeInterface === null || astNodeInterface === void 0 ? void 0 : astNodeInterface.children) === null || _a === void 0 ? void 0 : _a[0];
}
exports.getFirstChild = getFirstChild;
/**
 * Returns the first child by SyntaxKind of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
function getFirstChildByKind(astNodeInterface, kind) {
    var _a;
    return (_a = astNodeInterface === null || astNodeInterface === void 0 ? void 0 : astNodeInterface.children) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.kind === kind; });
}
exports.getFirstChildByKind = getFirstChildByKind;
/**
 * Returns the first descendant by SyntaxKind of a given AstNodeInterface
 * @param astNodeInterface  // The AstNodeInterface to check
 */
function getFirstDescendantByKind(astNodeInterface, kind) {
    if (!(astNodeInterface === null || astNodeInterface === void 0 ? void 0 : astNodeInterface.children)) {
        return undefined;
    }
    var child = getFirstChildByKind(astNodeInterface, kind);
    return child !== null && child !== void 0 ? child : getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterface.children, kind);
}
exports.getFirstDescendantByKind = getFirstDescendantByKind;
/**
 * Returns the first descendant of a given SyntaxKind in a given array of AstNodeInterface
 * @param astNodeInterfaces  // The AstNodeInterfaces to check
 * @param kind
 */
function getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterfaces, kind) {
    if (!astNodeInterfaces || astNodeInterfaces.length === 0) {
        return undefined;
    }
    var definedAstNodeInterfaces = astNodeInterfaces.filter(function (a) { return !!a; });
    for (var _i = 0, definedAstNodeInterfaces_1 = definedAstNodeInterfaces; _i < definedAstNodeInterfaces_1.length; _i++) {
        var astNode = definedAstNodeInterfaces_1[_i];
        if (astNode.kind === kind) {
            return astNode;
        }
    }
    return getFirstDescendantOfAstNodeInterfaceArrayOfKind(arrays_util_1.flat(definedAstNodeInterfaces.map(function (a) { return a.children; })), kind);
}
/**
 * Returns the first Block AstNode which is a child of a given ArrowFunction AstNodeInterface
 * @param arrowFunctionNodeInterface  // The AstNodeInterface to check
 */
function arrowFunctionBlock(arrowFunctionNodeInterface) {
    return getFirstChildByKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), syntax_kind_enum_1.SyntaxKind.Block);
}
exports.arrowFunctionBlock = arrowFunctionBlock;
/**
 * Returns the first ArrowFunction AstNode of a given VarStatement AstNode
 * @param varStatement              // The astNode to check
 */
function arrowFunctionOfVarStatement(varStatement) {
    return getFirstChildByKind(getFirstChild(getFirstChild(varStatement)), syntax_kind_enum_1.SyntaxKind.ArrowFunction);
}
exports.arrowFunctionOfVarStatement = arrowFunctionOfVarStatement;
