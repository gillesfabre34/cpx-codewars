#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var options_model_1 = require("./core/models/options.model");
var file_service_1 = require("./core/services/file.service");
var chalk = require("chalk");
var ora = require('ora');
var path = require('path');
var spinner = ora();
var ARGS = process.argv.slice(2);
var PATH_TO_ANALYSE = (_a = ARGS[0]) !== null && _a !== void 0 ? _a : '.';
var LANGUAGE = (_b = ARGS[1]) !== null && _b !== void 0 ? _b : 'ts';
var ENABLE_MARKDOWN_REPORT = ARGS[2] === 'true';
var ENABLE_CONSOLE_REPORT = ARGS[3] === 'true';
var ENABLE_REFACTORING = ARGS[4] === 'true';
var FRAMEWORK = (_c = ARGS[5]) !== null && _c !== void 0 ? _c : undefined;
var DEBUG = true;
var pathToAnalyse;
if (path.isAbsolute(PATH_TO_ANALYSE)) {
    pathToAnalyse = PATH_TO_ANALYSE;
}
else {
    pathToAnalyse = (process.cwd() + "/" + PATH_TO_ANALYSE).split('/').filter(function (e) { return e !== '.'; }).join('/');
}
start()
    .then(function (exitCode) {
    process.exit(exitCode);
})
    .catch(function (err) {
    spinner.fail();
    console.log(err);
});
function start() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var reportResult, stats;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (DEBUG) {
                        pathToAnalyse = process.cwd() + "/genese-cpx/src/core/mocks";
                        FRAMEWORK = 'react';
                    }
                    options_model_1.Options.setOptions(process.cwd(), pathToAnalyse, __dirname);
                    if (!ENABLE_CONSOLE_REPORT) {
                        file_service_1.createOutDir();
                    }
                    spinner.start('AST generation');
                    return [4 /*yield*/, useWorker(__dirname + "/workers/ast-worker.js", {
                            pathCommand: process.cwd(),
                            modifiedPath: pathToAnalyse,
                            pathGeneseNodeJs: __dirname,
                            language: LANGUAGE,
                            framework: FRAMEWORK
                        })];
                case 1:
                    _b.sent();
                    spinner.succeed();
                    spinner.start('Report generation');
                    return [4 /*yield*/, useWorker(__dirname + "/workers/report-worker.js", {
                            pathCommand: process.cwd(),
                            modifiedPath: pathToAnalyse,
                            pathGeneseNodeJs: __dirname,
                            markdown: ENABLE_MARKDOWN_REPORT,
                            consoleMode: ENABLE_CONSOLE_REPORT,
                            framework: FRAMEWORK
                        })];
                case 2:
                    reportResult = _b.sent();
                    spinner.succeed();
                    if (((_a = reportResult.message) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        console.log();
                        if (typeof reportResult.message === 'object') {
                            console.table(reportResult.message, ['filename', 'methodName', 'cpxIndex']);
                        }
                        else {
                            stats = reportResult.astFolder['_stats'];
                            console.log(chalk.blueBright('Files : '), stats.numberOfFiles);
                            console.log(chalk.blueBright('Methods : '), stats.numberOfMethods);
                            console.log(chalk.blueBright('Cognitive Complexity : '), stats.totalCognitiveComplexity);
                            console.log(chalk.blueBright('Cyclomatic Complexity : '), stats.totalCyclomaticComplexity);
                            console.log(reportResult.message);
                        }
                        if (ENABLE_CONSOLE_REPORT) {
                            return [2 /*return*/, 1];
                        }
                    }
                    return [2 /*return*/, 0];
            }
        });
    });
}
function useWorker(filepath, data) {
    return new Promise(function (resolve, reject) {
        var worker = new worker_threads_1.Worker(filepath, { workerData: data });
        worker.on('message', function (message) {
            resolve(message);
        });
        worker.on('error', reject);
        worker.on('exit', function (code) {
            if (code !== 0) {
                reject(new Error("Worker stopped with exit code " + code));
            }
        });
    });
}
