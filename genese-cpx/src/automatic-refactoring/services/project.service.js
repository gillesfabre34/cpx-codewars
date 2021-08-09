"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
var ts_morph_1 = require("ts-morph");
var ProjectService = /** @class */ (function () {
    function ProjectService(tsConfigFilePath) {
        this.refactorProposals = [];
        this.project = new ts_morph_1.Project({ tsConfigFilePath: tsConfigFilePath });
    }
    /**
     * Add new refactor proposals to the list, and replace the existing ones
     * @param refactorProposals
     */
    ProjectService.prototype.addToRefactorProposals = function (refactorProposals) {
        var _this = this;
        refactorProposals.forEach(function (proposal) {
            var index = _this.refactorProposals.findIndex(function (r) { return r.id === proposal.id; });
            if (index !== -1) {
                _this.refactorProposals[index] = proposal;
            }
            else {
                _this.refactorProposals.push(proposal);
            }
        });
    };
    /**
     * Get systems of a given Syntax Kind
     * @param kind the kind
     * @returns {Node[]}
     */
    ProjectService.prototype.getNodesOfKinds = function (kind) {
        var SYSTEMS = [];
        this.project.getSourceFiles().forEach(function (sf) {
            var FILE_SYSTEMS = sf.getDescendantsOfKind(kind);
            SYSTEMS.push.apply(SYSTEMS, FILE_SYSTEMS);
        });
        return SYSTEMS;
    };
    return ProjectService;
}());
exports.ProjectService = ProjectService;
