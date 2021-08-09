"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
var chalk = require('chalk');
var LogService = /** @class */ (function () {
    function LogService() {
    }
    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Logs all the AST of the AstNode of a given AstMethod
     * This method runs, but is not yet used
     */
    LogService.logMethod = function (astMethod, logLines) {
        if (logLines === void 0) { logLines = false; }
        if (!(astMethod === null || astMethod === void 0 ? void 0 : astMethod.astNode)) {
            console.log('Method undefined');
            return;
        }
        console.log('------------------------------------');
        console.log('METHOD ', astMethod.name, ' : ', astMethod.cpxIndex);
        console.log('------------------------------------');
        this.logAstNode(astMethod.astNode, '');
        this.logMethodChildren(astMethod.astNode, ' ');
        if (logLines) {
            this.logCodeLines(astMethod.codeLines, astMethod.astNode);
        }
    };
    /**
     * Logs the AST of the children asts
     * This method runs, but is not yet used
     * @ast // The ast to print
     * @indent // the indentation to use for the print
     */
    LogService.logMethodChildren = function (astNode, indent) {
        for (var _i = 0, _a = astNode.children; _i < _a.length; _i++) {
            var childAst = _a[_i];
            this.logAstNode(childAst, indent);
            var newIndent = indent + '  ';
            this.logMethodChildren(childAst, newIndent);
        }
    };
    /**
     * Logs the AST of a AstNode with its complexity factors, its context and its parent
     * @param astNode       // The AstNode to log
     * @param indent        // The current indentation
     */
    LogService.logAstNode = function (astNode, indent) {
        var _a, _b, _c, _d;
        var color = '';
        if (((_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.total) < 0.5) {
            color = 'white';
        }
        else {
            color = ((_b = astNode.cpxFactors) === null || _b === void 0 ? void 0 : _b.total) > 1 ? 'red' : 'yellow';
        }
        var logs = [];
        logs.push(indent);
        logs.push(chalk[color](astNode.kind));
        logs = logs.concat(LogService.addLog('line', astNode.linePos));
        logs = logs.concat(LogService.addLog('atomic', astNode.atomicCpx));
        logs = logs.concat(LogService.addLog('structural', astNode.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', astNode.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', astNode.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', astNode.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', astNode.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright((_c = astNode.context) === null || _c === void 0 ? void 0 : _c.name));
        logs.push('parent :');
        logs.push(chalk.greenBright((_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.kind));
        console.log.apply(console, logs);
    };
    LogService.logCodeLines = function (codeLines, methodAstNode) {
        if (codeLines === void 0) { codeLines = []; }
        for (var _i = 0, codeLines_1 = codeLines; _i < codeLines_1.length; _i++) {
            var line = codeLines_1[_i];
            this.logCodeLine(line, methodAstNode);
        }
    };
    LogService.logCodeLine = function (line, methodAstNode) {
        console.log('LINE ', chalk.greenBright(line.issue), line.start, '-', line.end, line.isEndingWithBlockComments, line.text);
        console.log.apply(console, this.logCodeLineNode(line, methodAstNode, methodAstNode.pos));
    };
    LogService.logCodeLineNode = function (line, astNode, methodPosition, logs) {
        if (logs === void 0) { logs = []; }
        if (this.isAstNodeInCodeLine(astNode.start, line)) {
            logs.push(chalk.blueBright(astNode.kind));
            logs.push(astNode.start.toString());
        }
        for (var _i = 0, _a = astNode.children; _i < _a.length; _i++) {
            var childAstNode = _a[_i];
            if (childAstNode.start < line.end) {
                this.logCodeLineNode(line, childAstNode, methodPosition, logs);
            }
        }
        return logs;
    };
    LogService.isAstNodeInCodeLine = function (astNodeStart, line) {
        return astNodeStart >= line.start && astNodeStart <= line.end;
    };
    /**
     * Adds a text with its value in a console.logg if the value is positive
     * @param text      // The text to add
     * @param value     // The corresponding value
     */
    LogService.addLog = function (text, value) {
        return value > 0 ? [text, value] : [];
    };
    return LogService;
}());
exports.LogService = LogService;
