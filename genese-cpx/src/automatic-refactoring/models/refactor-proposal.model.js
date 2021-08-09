"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorProposal = void 0;
var RefactorProposal = /** @class */ (function () {
    function RefactorProposal() {
        this.title = '';
        this.oldCode = '';
        this.newCode = '';
        this.id = '';
        this.oldComplexity = 0;
        this.newComplexity = 0;
    }
    return RefactorProposal;
}());
exports.RefactorProposal = RefactorProposal;
