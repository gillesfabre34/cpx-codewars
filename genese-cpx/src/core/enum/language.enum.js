"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLanguage = exports.Language = void 0;
var Language;
(function (Language) {
    Language["JAVA"] = "java";
    Language["PHP"] = "php";
    Language["TS"] = "ts";
    Language["TYPESCRIPT"] = "typescript";
    Language["JS"] = "js";
    Language["TSX"] = "tsx";
    Language["JSX"] = "jsx";
})(Language = exports.Language || (exports.Language = {}));
function isLanguage(extension) {
    return Object.values(Language).includes(extension);
}
exports.isLanguage = isLanguage;
