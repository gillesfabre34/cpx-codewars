"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorerUtils = void 0;
var ts_morph_1 = require("ts-morph");
var RefactorerUtils = /** @class */ (function () {
    function RefactorerUtils() {
    }
    /**
     * Simple way to create method node
     * @param name the method name
     * @param block the method block node
     * @param parameters the method parameters
     * @returns {ts.MethodDeclaration}
     */
    RefactorerUtils.createSimpleMethod = function (name, block, parameters) {
        if (parameters === void 0) { parameters = []; }
        return ts_morph_1.ts.createMethod([], [], undefined, name, undefined, undefined, parameters, undefined, block);
    };
    /**
     * Simple way to create a parameter
     * @param identifier the parameter name
     * @param type the parameter type
     * @returns {ts.ParameterDeclaration}
     */
    RefactorerUtils.createSimpleParameter = function (identifier, type) {
        return ts_morph_1.ts.createParameter([], [], undefined, identifier, undefined, type);
    };
    /**
     * Simple way to create a method call
     * @param name the method to call name
     * @param parameters the passed parameters
     * @returns {ts.CallExpression}
     */
    RefactorerUtils.createMethodCall = function (name, parameters) {
        if (parameters === void 0) { parameters = []; }
        return ts_morph_1.ts.createCall(ts_morph_1.ts.createPropertyAccessChain(ts_morph_1.ts.createThis(), undefined, ts_morph_1.ts.createIdentifier(name)), [], parameters);
    };
    return RefactorerUtils;
}());
exports.RefactorerUtils = RefactorerUtils;
