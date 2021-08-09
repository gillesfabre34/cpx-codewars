"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityService = void 0;
var init_generation_service_1 = require("../../languages-to-json-ast/init-generation.service");
var json_service_1 = require("../../languages-to-json-ast/json.service");
var json_ast_to_reports_1 = require("../../json-ast-to-reports/json-ast-to-reports");
var ComplexityService = /** @class */ (function () {
    function ComplexityService() {
    }
    /**
     * Get the cognitive complexity of the given source code
     * @param sourceCode
     * @returns {number}
     */
    ComplexityService.getCpxFromSourceCode = function (sourceCode) {
        var initGenerationService = new init_generation_service_1.InitGenerationService();
        var jsonAst = {
            astFolder: undefined
        };
        var astFolder = initGenerationService.generateAstFolderFromString(sourceCode).astFolder;
        astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return json_ast_to_reports_1.JsonAstToReports.getTotalCpx(jsonAst);
    };
    return ComplexityService;
}());
exports.ComplexityService = ComplexityService;
