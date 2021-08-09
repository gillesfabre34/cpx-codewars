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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UselessElseRefactorer = void 0;
var ts_morph_1 = require("ts-morph");
var refactorer_model_1 = require("../models/refactorer.model");
var UselessElseRefactorer = /** @class */ (function (_super) {
    __extends(UselessElseRefactorer, _super);
    function UselessElseRefactorer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.REFACTORED_NODE_KIND = ts_morph_1.SyntaxKind.MethodDeclaration;
        return _this;
    }
    /**
     * Check method structure to know if it needs refacto
     * if true refactor the method
     * @returns {void}
     * @param node
     */
    UselessElseRefactorer.prototype.refactorNeeded = function (node) {
        var _a, _b;
        var FIRST_BLOCK = node.getFirstChildByKind(ts_morph_1.SyntaxKind.Block);
        var IF_STATEMENT = FIRST_BLOCK === null || FIRST_BLOCK === void 0 ? void 0 : FIRST_BLOCK.getChildrenOfKind(ts_morph_1.SyntaxKind.IfStatement)[0];
        var HAS_ELSE_STATEMENT = ((_a = IF_STATEMENT === null || IF_STATEMENT === void 0 ? void 0 : IF_STATEMENT.getChildrenOfKind(ts_morph_1.SyntaxKind.Block)) === null || _a === void 0 ? void 0 : _a.length) === 2;
        var HAS_RETURN_ON_IF = (_b = IF_STATEMENT === null || IF_STATEMENT === void 0 ? void 0 : IF_STATEMENT.getFirstChildByKind(ts_morph_1.SyntaxKind.Block)) === null || _b === void 0 ? void 0 : _b.getFirstChildByKind(ts_morph_1.SyntaxKind.ReturnStatement);
        return Boolean(IF_STATEMENT && HAS_ELSE_STATEMENT && HAS_RETURN_ON_IF);
    };
    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @returns {void}
     * @param node
     */
    UselessElseRefactorer.prototype.refactor = function (node) {
        var _a;
        var elseStatements = [];
        node.transform(function (traversal) {
            var currentNode = refactorer_model_1.Refactorer.wrapCurrentNode(node, traversal);
            if (ts_morph_1.Node.isIfStatement(currentNode) && currentNode.getElseStatement()) {
                elseStatements = currentNode.getElseStatement().getChildren().map(function (s) { return s.getFullText(); });
                elseStatements = elseStatements.slice(1, elseStatements.length - 1);
                if (elseStatements[0])
                    elseStatements[0] = elseStatements[0].replace(/\n/, '');
                return ts_morph_1.ts.createIf(currentNode.getExpression().compilerNode, currentNode.getThenStatement().compilerNode);
            }
            return currentNode.compilerNode;
        });
        (_a = node.getFirstDescendantByKind(ts_morph_1.SyntaxKind.Block)) === null || _a === void 0 ? void 0 : _a.addStatements(elseStatements);
        return node;
    };
    return UselessElseRefactorer;
}(refactorer_model_1.Refactorer));
exports.UselessElseRefactorer = UselessElseRefactorer;
