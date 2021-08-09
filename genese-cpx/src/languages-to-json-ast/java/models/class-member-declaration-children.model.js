"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMemberDeclarationChildren = void 0;
var method_declaration_model_1 = require("./method-declaration.model");
var ClassMemberDeclarationChildren = /** @class */ (function () {
    function ClassMemberDeclarationChildren() {
        this.methodDeclaration = [new method_declaration_model_1.MethodDeclaration()];
    }
    return ClassMemberDeclarationChildren;
}());
exports.ClassMemberDeclarationChildren = ClassMemberDeclarationChildren;
