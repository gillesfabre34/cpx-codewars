"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
var globals_const_1 = require("../../globals.const");
var ts_morph_1 = require("ts-morph");
var function_kind_type_1 = require("../types/function-kind.type");
/**
 * Service for operations on Node elements (ts-morph nodes)
 */
var Ts = /** @class */ (function () {
    function Ts() {
    }
    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    Ts.getKindAlias = function (node) {
        var kind = node.getKindName();
        for (var _i = 0, KindAliases_1 = globals_const_1.KindAliases; _i < KindAliases_1.length; _i++) {
            var alias = KindAliases_1[_i];
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    };
    /**
     * Gets the name of a Node
     * @param node // The AST node
     */
    Ts.getName = function (node) {
        var _a, _b;
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.ClassDeclaration:
            case ts_morph_1.SyntaxKind.FunctionDeclaration:
            case ts_morph_1.SyntaxKind.MethodDeclaration:
            case ts_morph_1.SyntaxKind.Parameter:
                return (_b = (_a = node.compilerNode['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) !== null && _b !== void 0 ? _b : '';
            case ts_morph_1.SyntaxKind.Identifier:
                return node.compilerNode['escapedText'];
            default:
                return undefined;
        }
    };
    /**
     * Checks if a node is a call to a function or method
     * Example : a.slice(1)
     * @param node      // The node to check
     */
    Ts.isFunctionCall = function (node) {
        if (node.getKind() === ts_morph_1.SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        var parent = node === null || node === void 0 ? void 0 : node.getParent();
        if (!parent) {
            return false;
        }
        var grandParent = parent === null || parent === void 0 ? void 0 : parent.getParent();
        if (!grandParent) {
            return false;
        }
        var grandParentCall = grandParent.getKind() === ts_morph_1.SyntaxKind.CallExpression && grandParent.compilerNode['expression'].end === node.getEnd();
        var parentCall = parent.getKind() === ts_morph_1.SyntaxKind.CallExpression && parent.compilerNode['expression'].end === node.getEnd();
        return parentCall || grandParentCall;
    };
    Ts.isParameter = function (node) {
        return node.getKind() === ts_morph_1.SyntaxKind.Parameter;
    };
    Ts.isVarStatement = function (node) {
        return node.getKind() === ts_morph_1.SyntaxKind.VariableStatement;
    };
    Ts.isFunctionNode = function (node) {
        return function_kind_type_1.isFunctionKind(node.getKind());
    };
    Ts.getFunctionType = function (functionNode) {
        var _a;
        if (!this.hasCompilerNodeType(functionNode)) {
            return undefined;
        }
        else {
            return this.sanitizeType((_a = functionNode === null || functionNode === void 0 ? void 0 : functionNode.getReturnType()) === null || _a === void 0 ? void 0 : _a.getText());
        }
    };
    Ts.getParameterType = function (parameterNode) {
        var trivialInitializer = this.getTrivialInitializer(parameterNode);
        if (!this.hasCompilerNodeType(parameterNode) && !trivialInitializer) {
            return undefined;
        }
        else {
            return this.sanitizeType(parameterNode.getType().getText());
        }
    };
    Ts.getVarStatementType = function (varStatement) {
        var trivialInitializer = this.getTrivialInitializer(varStatement);
        if (!varStatement && !trivialInitializer) {
            return undefined;
        }
        var varDeclaration = varStatement === null || varStatement === void 0 ? void 0 : varStatement.getFirstDescendantByKind(ts_morph_1.SyntaxKind.VariableDeclaration);
        var type = this.sanitizeType(varDeclaration.getStructure().type);
        return trivialInitializer !== null && trivialInitializer !== void 0 ? trivialInitializer : type;
    };
    Ts.hasCompilerNodeType = function (node) {
        var _a;
        return !!((_a = node === null || node === void 0 ? void 0 : node.compilerNode) === null || _a === void 0 ? void 0 : _a.type);
    };
    Ts.getTrivialInitializer = function (node) {
        var initializer = this.isVarStatement(node) ? node === null || node === void 0 ? void 0 : node.getFirstDescendantByKind(ts_morph_1.SyntaxKind.VariableDeclaration).getInitializer() : node.getInitializer();
        return this.isLiteralOrNewExpression(initializer) ? initializer.getKindName() : undefined;
    };
    Ts.isLiteralOrNewExpression = function (expression) {
        return [ts_morph_1.SyntaxKind.NumericLiteral, ts_morph_1.SyntaxKind.StringLiteral, ts_morph_1.SyntaxKind.TrueKeyword, ts_morph_1.SyntaxKind.FalseKeyword, ts_morph_1.SyntaxKind.NewExpression].includes(expression === null || expression === void 0 ? void 0 : expression.getKind());
    };
    Ts.sanitizeType = function (type) {
        if (!type) {
            return '';
        }
        var sanitizedType = type.replace(/"/g, "'")
            .replace(/\n/g, ' ');
        return (sanitizedType === null || sanitizedType === void 0 ? void 0 : sanitizedType.includes('import')) ? 'import' : sanitizedType;
    };
    return Ts;
}());
exports.Ts = Ts;
