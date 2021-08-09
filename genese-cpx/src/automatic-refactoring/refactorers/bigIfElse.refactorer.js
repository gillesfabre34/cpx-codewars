"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIfElseRefactorer = void 0;
var ts_morph_1 = require("ts-morph");
var refactorer_model_1 = require("../models/refactorer.model");
var refactorer_utils_1 = require("../utils/refactorer.utils");
var BigIfElseRefactorer = /** @class */ (function (_super) {
    __extends(BigIfElseRefactorer, _super);
    function BigIfElseRefactorer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.REFACTORED_NODE_KIND = ts_morph_1.SyntaxKind.MethodDeclaration;
        return _this;
    }
    BigIfElseRefactorer.prototype.refactorNeeded = function (node) {
        var IF_STATEMENTS = node.getDescendantsOfKind(ts_morph_1.SyntaxKind.IfStatement);
        return IF_STATEMENTS.some(function (i) {
            var BLOCKS = i.getDescendantsOfKind(ts_morph_1.SyntaxKind.Block);
            return BLOCKS.some(function (b) { return b.compilerNode.statements.length > 5; });
        });
    };
    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    BigIfElseRefactorer.prototype.refactor = function (node) {
        var _this = this;
        var methods = [];
        var parameters = [];
        var inputs = [];
        var NODE = node.transform(function (traversal) {
            var currentNode = refactorer_model_1.Refactorer.wrapCurrentNode(node, traversal);
            _this.catchInputs(currentNode, inputs);
            if (_this.isConditionnedBlock(currentNode)) {
                currentNode.getDescendantsOfKind(ts_morph_1.SyntaxKind.VariableStatement).forEach(function (s) {
                    var IDENTIFIER = s.getFirstDescendantByKind(ts_morph_1.SyntaxKind.Identifier).getFullText();
                    inputs = inputs.filter(function (i) { return i.identifier !== IDENTIFIER; });
                });
                _this.keepOnlyParameters(currentNode, inputs, parameters);
                var METHOD_NAME = "methodToRename" + methods.length;
                var PARAMETERS = parameters.map(function (_a) {
                    var identifier = _a.identifier, type = _a.type;
                    return refactorer_utils_1.RefactorerUtils.createSimpleParameter(identifier, type);
                });
                var NEW_METHOD = refactorer_utils_1.RefactorerUtils.createSimpleMethod(METHOD_NAME, currentNode.compilerNode, PARAMETERS);
                methods.push(NEW_METHOD);
                var CONTAIN_RETURN = currentNode.compilerNode.statements.find(function (s) { return s.kind === ts_morph_1.ts.SyntaxKind.ReturnStatement; });
                var METHOD_CALL = refactorer_utils_1.RefactorerUtils.createMethodCall(METHOD_NAME, []);
                return ts_morph_1.ts.createBlock(CONTAIN_RETURN ? [ts_morph_1.ts.createReturn(METHOD_CALL)] : [METHOD_CALL]);
            }
            return currentNode.compilerNode;
        });
        this.addMethodToClass(NODE, methods);
        return NODE;
    };
    BigIfElseRefactorer.prototype.addMethodToClass = function (node, methods) {
        this.addTransformer({
            baseNode: node,
            nodeMethod: 'getParent',
            transformer: function (traversal) {
                var NODE = traversal.visitChildren();
                if (ts_morph_1.ts.isClassDeclaration(NODE)) {
                    var METHODS = ts_morph_1.ts.createNodeArray(__spreadArrays(NODE.members, methods));
                    return ts_morph_1.ts.createClassDeclaration([], [], NODE.name, [], [], METHODS);
                }
                return NODE;
            },
        });
    };
    BigIfElseRefactorer.prototype.keepOnlyParameters = function (node, inputs, parameters) {
        node.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier).forEach(function (d) {
            inputs.forEach(function (i) {
                if (i.identifier === d.getFullText() && !parameters.includes(i))
                    parameters.push(i);
            });
        });
    };
    BigIfElseRefactorer.prototype.catchInputs = function (node, inputs) {
        if (this.isInputs(node)) {
            var IDENTIFIER_1 = node.getFirstDescendantByKind(ts_morph_1.SyntaxKind.Identifier).getFullText();
            var TYPE = node === null || node === void 0 ? void 0 : node.compilerNode.type;
            if (!inputs.find(function (i) { return i.identifier === IDENTIFIER_1; }))
                inputs.push({ identifier: IDENTIFIER_1, type: TYPE, isParameter: false });
        }
    };
    BigIfElseRefactorer.prototype.isConditionnedBlock = function (node) {
        return node.getParent() && ts_morph_1.Node.isIfStatement(node.getParent()) && ts_morph_1.Node.isBlock(node) && node.getStatements().length > 5;
    };
    BigIfElseRefactorer.prototype.isInputs = function (node) {
        return (ts_morph_1.Node.isParameterDeclaration(node) && !ts_morph_1.Node.isArrowFunction(node.getParent())) || ts_morph_1.Node.isVariableDeclaration(node);
    };
    return BigIfElseRefactorer;
}(refactorer_model_1.Refactorer));
exports.BigIfElseRefactorer = BigIfElseRefactorer;
