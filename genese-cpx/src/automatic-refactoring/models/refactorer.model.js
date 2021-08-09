"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refactorer = void 0;
var ts_morph_1 = require("ts-morph");
var complexity_service_1 = require("../services/complexity.service");
var Refactorer = /** @class */ (function () {
    function Refactorer(projectService) {
        this.refactorProposals = [];
        this.projectService = projectService;
    }
    /**
     * Refactor nodes if it needed
     * apply transformers
     * then map refactored node in refactor proposal
     * @returns {void}
     */
    Refactorer.prototype.apply = function () {
        var _this = this;
        this.nodes = this.projectService.getNodesOfKinds(this.REFACTORED_NODE_KIND)
            .filter(function (n) { return _this.refactorNeeded(n); })
            .map(function (n, i) {
            _this.processOriginalNode(n);
            _this.refactor(n);
            _this.processRefactoredNode(n, i);
            return n;
        });
        if (this.transformers) {
            this.applyTransformers();
        }
    };
    /**
     * Apply additional tranformers to the node
     */
    Refactorer.prototype.applyTransformers = function () {
        var _this = this;
        this.nodes = this.transformers.map(function (t, i) {
            var r = t.baseNode[t.nodeMethod]().transform(t.transformer);
            r.formatText();
            _this.refactorProposals[i].newCode = r.getFullText();
            _this.refactorProposals[i].usedTransformer = t;
            return r;
        });
    };
    /**
     * Compute and store information about the refactored node
     * @param n
     * @param i
     */
    Refactorer.prototype.processRefactoredNode = function (n, i) {
        var _this = this;
        this.refactorProposals[i].newComplexity = complexity_service_1.ComplexityService.getCpxFromSourceCode(n.getFullText());
        var existingRefactor = this.projectService.refactorProposals.find(function (er) { return er.id === _this.refactorProposals[i].id; });
        if (existingRefactor && existingRefactor.usedTransformer) {
            this.refactorProposals[i].oldCode = existingRefactor.oldCode;
            var transformer = existingRefactor.usedTransformer;
            n = n[transformer.nodeMethod]().transform(transformer.transformer);
        }
        n.formatText();
        this.refactorProposals[i].newCode = n.getFullText();
    };
    /**
     * Compute and store information about the original node
     * @param n
     */
    Refactorer.prototype.processOriginalNode = function (n) {
        n.formatText();
        this.refactorProposals.push({
            oldCode: n.getFullText(),
            newCode: undefined,
            title: n.getStructure()['name'],
            id: n.getStructure()['name'],
            oldComplexity: complexity_service_1.ComplexityService.getCpxFromSourceCode(n.getFullText()),
            newComplexity: undefined
        });
    };
    /**
     * Add a transformer
     * @param transformer
     * @returns {void}
     */
    Refactorer.prototype.addTransformer = function (transformer) {
        if (!this.transformers)
            this.transformers = [];
        if (!this.transformers.includes(transformer)) {
            this.transformers.push(transformer);
        }
    };
    /**
     * wrap a basic node into ts-morph model
     * use project to get source file and type checker
     * @param node
     * @param traversal the node to wrap
     * @returns {Node}
     */
    Refactorer.wrapCurrentNode = function (node, traversal) {
        return ts_morph_1.createWrappedNode(traversal.visitChildren(), {
            sourceFile: node.getSourceFile().compilerNode,
            typeChecker: node.getProject().getTypeChecker().compilerObject,
        });
    };
    return Refactorer;
}());
exports.Refactorer = Refactorer;
