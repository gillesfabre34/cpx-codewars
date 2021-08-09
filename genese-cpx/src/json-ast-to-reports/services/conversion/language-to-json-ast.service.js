"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageToJsonAstService = void 0;
var language_enum_1 = require("../../../core/enum/language.enum");
var php_to_json_ast_service_1 = require("./php-to-json-ast.service");
var LanguageToJsonAstService = /** @class */ (function () {
    function LanguageToJsonAstService() {
    }
    LanguageToJsonAstService.convert = function (path, language) {
        switch (language) {
            case language_enum_1.Language.PHP:
                return php_to_json_ast_service_1.PhpToJsonAstService.convert(path);
            default:
                console.error('Unknown language ', language);
                return undefined;
        }
    };
    return LanguageToJsonAstService;
}());
exports.LanguageToJsonAstService = LanguageToJsonAstService;
