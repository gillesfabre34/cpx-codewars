"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFolderMarkdownReportService = void 0;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var file_service_1 = require("../../../core/services/file.service");
var ast_folder_service_1 = require("../ast/ast-folder.service");
var options_model_1 = require("../../../core/models/options.model");
var ast_method_service_1 = require("../ast/ast-method.service");
/**
 * Service generating folders reports
 */
var AstFolderMarkdownReportService = /** @class */ (function () {
    function AstFolderMarkdownReportService(astFolder) {
        this.astFolder = undefined; // The AstFolder relative to this service
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service relative to AstFolders
        this.methodsArrayReport = []; // The array of methods reports
        this.template = undefined; // The HandleBar template used to generate the report
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }
    /**
     * Generates the folder's report
     */
    AstFolderMarkdownReportService.prototype.generateReport = function () {
        this.setMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        var reportTemplate = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/json-ast-to-reports/templates/handlebars/folder-markdown-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    /**
     * Set the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderMarkdownReportService.prototype.setMethodsArraySortedByDecreasingCognitiveCpx = function (astFolder) {
        this.setTsFileReport(astFolder);
        this.setMethodsArrayReport(astFolder);
        this.methodsArrayReport = ast_method_service_1.AstMethodService.sortByDecreasingCognitiveCpx(this.methodsArrayReport);
    };
    /**
     * Recursion setting the array of methods reports of each subFolder
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderMarkdownReportService.prototype.setMethodsArrayReport = function (astFolder) {
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            this.setTsFileReport(subFolder);
            this.setMethodsArrayReport(subFolder);
        }
    };
    /**
     * Recursion setting the array of methods reports of each subFolder's files
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderMarkdownReportService.prototype.setTsFileReport = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            this.setAstMethodReport(tsFile);
        }
    };
    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFile    // The AstFile to analyse
     */
    AstFolderMarkdownReportService.prototype.setAstMethodReport = function (astFile) {
        for (var _i = 0, _a = astFile.astMethods; _i < _a.length; _i++) {
            var astMethod = _a[_i];
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: undefined,
                methodName: astMethod.name
            });
        }
    };
    /**
     * Fills the HandleBar's template
     */
    AstFolderMarkdownReportService.prototype.writeReport = function () {
        var template = this.template({
            rowFile: this.methodsArrayReport,
        });
        if (this.astFolder.relativePath) {
            file_service_1.createRelativeDir(this.astFolder.relativePath);
        }
        var pathOutDir = file_service_1.constructLink(options_model_1.Options.pathOutDir);
        var relativePath = file_service_1.constructLink(this.astFolder.relativePath);
        var pathReport = file_service_1.deleteLastSlash(pathOutDir) + "/" + file_service_1.deleteLastSlash(relativePath) + "/folder-report.md";
        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        }
        catch (err) {
            console.log(err);
        }
    };
    return AstFolderMarkdownReportService;
}());
exports.AstFolderMarkdownReportService = AstFolderMarkdownReportService;
