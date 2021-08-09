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
exports.TernaryToNullishCoalescing = void 0;
var ts_morph_1 = require("ts-morph");
var refactorer_model_1 = require("../models/refactorer.model");
var TernaryToNullishCoalescing = /** @class */ (function (_super) {
    __extends(TernaryToNullishCoalescing, _super);
    function TernaryToNullishCoalescing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.REFACTORED_NODE_KIND = ts_morph_1.SyntaxKind.MethodDeclaration;
        return _this;
    }
    TernaryToNullishCoalescing.prototype.refactorNeeded = function (node) {
        var refactorNeeded = false;
        var TERNARY_EXPRESSIONS = node.getDescendantsOfKind(ts_morph_1.SyntaxKind.ConditionalExpression);
        TERNARY_EXPRESSIONS.forEach(function (ternary) {
            var COUNT = ternary.getChildCount();
            if (ts_morph_1.Node.isConditionalExpression(ternary) && COUNT > 0) {
                var FIRST_MEMBER = ternary.getChildAtIndex(0);
                var SECOND_MEMBER = ternary.getChildAtIndex(2);
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    refactorNeeded = true;
                }
            }
        });
        return refactorNeeded;
    };
    /**
     * Copy current method then transform the copy to get refctored method
     * Put refactored method on current method object
     * @param method the current method
     * @returns {void}
     */
    TernaryToNullishCoalescing.prototype.refactor = function (node) {
        return node.transform(function (traversal) {
            var currentNode = refactorer_model_1.Refactorer.wrapCurrentNode(node, traversal);
            if (ts_morph_1.Node.isConditionalExpression(currentNode)) {
                var FIRST_MEMBER = currentNode.getChildAtIndex(0);
                var SECOND_MEMBER = currentNode.getChildAtIndex(2);
                if (FIRST_MEMBER.getText() === SECOND_MEMBER.getText() && FIRST_MEMBER.getKind() === SECOND_MEMBER.getKind()) {
                    var THIRD_MEMBER = currentNode.getChildAtIndex(4);
                    return ts_morph_1.ts.createBinary(FIRST_MEMBER.compilerNode, ts_morph_1.SyntaxKind.QuestionQuestionToken, THIRD_MEMBER.compilerNode);
                }
            }
            return currentNode.compilerNode;
        });
    };
    return TernaryToNullishCoalescing;
}(refactorer_model_1.Refactorer));
exports.TernaryToNullishCoalescing = TernaryToNullishCoalescing;
