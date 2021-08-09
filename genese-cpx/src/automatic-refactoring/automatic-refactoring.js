"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticRefactoring = void 0;
// import { BigIfElseRefactorer } from './refactorers/bigIfElse.refactorer';
var project_service_1 = require("./services/project.service");
var uselessElse_refactorer_1 = require("./refactorers/uselessElse.refactorer");
var refactor_report_service_1 = require("./services/refactor-report.service");
var bigIfElse_refactorer_1 = require("./refactorers/bigIfElse.refactorer");
var AutomaticRefactoring = /** @class */ (function () {
    function AutomaticRefactoring() {
    }
    AutomaticRefactoring.setRefactorer = function () {
        var refactorers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            refactorers[_i] = arguments[_i];
        }
        this.refactorers = refactorers;
    };
    AutomaticRefactoring.start = function (astFolder) {
        this.setRefactorer(bigIfElse_refactorer_1.BigIfElseRefactorer, uselessElse_refactorer_1.UselessElseRefactorer);
        this.refactorFromSourceFile();
        new refactor_report_service_1.RefactorReportService(this.projectService.refactorProposals, astFolder).generateRefactorReport();
    };
    AutomaticRefactoring.refactorFromSourceFile = function () {
        var _this = this;
        this.refactorers.forEach(function (r) {
            var REFACTORER = new r(_this.projectService);
            REFACTORER.apply();
            _this.projectService.addToRefactorProposals(REFACTORER.refactorProposals);
        });
    };
    AutomaticRefactoring.projectService = new project_service_1.ProjectService('tsconfig.json');
    return AutomaticRefactoring;
}());
exports.AutomaticRefactoring = AutomaticRefactoring;
