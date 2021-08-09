"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpToJsonAstService = void 0;
var json_ast_model_1 = require("../../models/ast/json-ast.model");
var PhpToJsonAstService = /** @class */ (function () {
    function PhpToJsonAstService() {
    }
    PhpToJsonAstService.convert = function (path) {
        var jsonAst = new json_ast_model_1.JsonAst();
        console.log('PHP TO JSON AST path', path);
        return jsonAst;
    };
    return PhpToJsonAstService;
}());
exports.PhpToJsonAstService = PhpToJsonAstService;
