"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowFunctionsService = void 0;
var ast_method_model_1 = require("../../models/ast/ast-method.model");
var ast_node_service_1 = require("./ast-node.service");
/**
 * Service specific to ArrowFunctions AstNodes
 */
var ArrowFunctionsService = /** @class */ (function () {
    function ArrowFunctionsService() {
    }
    /**
     * Returns the ArrowFunctions which are children of a given AstNode
     * @param astNode       // The astNode to check
     */
    ArrowFunctionsService.getArrowFunctions = function (astNode) {
        var statements = this.getStatementsDeclaringOrAssigningArrowFunctions(astNode);
        var arrowFunctions = [];
        for (var _i = 0, statements_1 = statements; _i < statements_1.length; _i++) {
            var statement = statements_1[_i];
            var arrowFunction = statement.isExpressionStatement ? this.getExprStatementArrowFunction(statement) : this.getVarStatementArrowFunction(statement);
            if (arrowFunction) {
                arrowFunctions.push(arrowFunction);
            }
        }
        return arrowFunctions;
    };
    /**
     * Returns the children of a given AstNode which are statements which are arrow function declarations or function assignments
     * Examples :
     *   -> const someFunction = () => {}
     *   -> someVar.func = () => {}
     * @param astNode       // The astNode to check
     * @private
     */
    ArrowFunctionsService.getStatementsDeclaringOrAssigningArrowFunctions = function (astNode) {
        var _a, _b;
        var varStatements = (_a = astNode.children) === null || _a === void 0 ? void 0 : _a.filter(function (n) { return n.isVarStatement && n.hasArrowFunctionDescendant; });
        var exprStatements = (_b = astNode.children) === null || _b === void 0 ? void 0 : _b.filter(function (n) { return n.isExpressionStatement && n.hasArrowFunctionDescendant; });
        return varStatements.concat(exprStatements);
    };
    /**
     * Creates and returns a new AstMethod corresponding to the arrow function in some given VarStatement
     * @param statement     // The VarStatement containing the arrow function
     * @private
     */
    ArrowFunctionsService.getVarStatementArrowFunction = function (statement) {
        var _a, _b, _c;
        var variableDeclarationList = (_a = statement.children) === null || _a === void 0 ? void 0 : _a[0];
        var variableDeclaration = (_b = variableDeclarationList === null || variableDeclarationList === void 0 ? void 0 : variableDeclarationList.children) === null || _b === void 0 ? void 0 : _b[0];
        return variableDeclaration ? this.createArrowFunction(statement, (_c = variableDeclaration.children[0]) === null || _c === void 0 ? void 0 : _c.name) : undefined;
    };
    /**
     * Creates and returns a new AstMethod corresponding to the arrow function in some given ExpressionStatement
     * @param statement     // The ExpressionStatement containing the arrow function
     * @private
     */
    ArrowFunctionsService.getExprStatementArrowFunction = function (statement) {
        var _a, _b;
        var expression = statement.children[0];
        var identifiers = (_b = (_a = expression.children[0]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.filter(function (c) { return c.isIdentifier; });
        var name = identifiers.map(function (i) { return i.name; }).join('.');
        return this.createArrowFunction(expression, name);
    };
    /**
     * Creates and returns a new AstMethod corresponding to a VarStatement or ExpressionStatement containing some arrow function
     * @param astNode       // The VarStatement or ExpressionStatement
     * @param name          // The name to give to the AstMethod
     * @private
     */
    ArrowFunctionsService.createArrowFunction = function (astNode, name) {
        var _a, _b, _c;
        var arrowFunction = new ast_method_model_1.AstMethod();
        arrowFunction.name = name;
        arrowFunction.astNode = astNode;
        var astNodeService = new ast_node_service_1.AstNodeService();
        arrowFunction.astNode.text = astNodeService.getCode(astNode);
        arrowFunction.isArrowFunction = true;
        arrowFunction.codeLines = (_c = (_b = (_a = astNode.astFile) === null || _a === void 0 ? void 0 : _a.code) === null || _b === void 0 ? void 0 : _b.lines) === null || _c === void 0 ? void 0 : _c.slice(astNode.linePos - 1, astNode.lineEnd);
        return arrowFunction;
    };
    return ArrowFunctionsService;
}());
exports.ArrowFunctionsService = ArrowFunctionsService;
