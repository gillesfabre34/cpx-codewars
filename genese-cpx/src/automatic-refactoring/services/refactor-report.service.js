"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorReportService = void 0;
var eol = require("eol");
var fs = require("fs-extra");
var Handlebars = require("handlebars");
var options_model_1 = require("../../core/models/options.model");
var file_service_1 = require("../../core/services/file.service");
/**
 * Service generating files reports
 */
var RefactorReportService = /** @class */ (function () {
    function RefactorReportService(systems, astFolder) {
        this.systems = systems;
        this.astFolder = astFolder;
    }
    Object.defineProperty(RefactorReportService.prototype, "refactorProposals", {
        get: function () {
            return this.systems;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Register partials and compile template
     * @returns {void}
     */
    RefactorReportService.prototype.generateRefactorReport = function () {
        this.registerPartial('refactorProposals', 'refactor-proposals');
        this.registerPartial('refactorComparaison', 'refactor-comparaison');
        this.registerPartial('methodCode', 'method-script');
        var TEMPLATE_PATH = options_model_1.Options.pathGeneseNodeJs + "/automatic-refactoring/templates/handlebars/refactor-proposals.handlebars";
        var REPORT_TEMPLATE = this.getFileFromPath(TEMPLATE_PATH);
        this.template = Handlebars.compile(REPORT_TEMPLATE);
        this.writeRefactorReport();
    };
    /**
     * Generate refactor report HTML
     * @returns {void}
     */
    RefactorReportService.prototype.writeRefactorReport = function () {
        var _a, _b;
        var RELATIVE_ROOT = file_service_1.getRouteToRoot((_a = this.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        var TEMPLATE = this.template({ proposals: this.refactorProposals, relativeRoot: RELATIVE_ROOT });
        var RELATIVE_PATH = file_service_1.constructLink((_b = this.astFolder) === null || _b === void 0 ? void 0 : _b.relativePath);
        var OUT_DIR = file_service_1.constructLink(options_model_1.Options.pathOutDir);
        var PATH_REPORT = file_service_1.deleteLastSlash(OUT_DIR) + "/" + file_service_1.deleteLastSlash(RELATIVE_PATH) + "/refactor-report.html";
        fs.outputFileSync(PATH_REPORT, TEMPLATE, { encoding: 'utf-8' });
    };
    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     * @returns {void}
     */
    RefactorReportService.prototype.registerPartial = function (partialName, filename) {
        var PARTIAL_PATH = options_model_1.Options.pathGeneseNodeJs + "/automatic-refactoring/templates/handlebars/" + filename + ".handlebars";
        var PARTIAL = this.getFileFromPath(PARTIAL_PATH);
        Handlebars.registerPartial(partialName, PARTIAL);
    };
    /**
     * read file, normalize content and return it
     * @param path the file path
     * @returns {string}
     */
    RefactorReportService.prototype.getFileFromPath = function (path) {
        var FILE_CONTENT = fs.readFileSync(path, 'utf-8');
        return eol.auto(FILE_CONTENT);
    };
    return RefactorReportService;
}());
exports.RefactorReportService = RefactorReportService;
