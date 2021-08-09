"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options_model_1 = require("../core/models/options.model");
var automatic_refactoring_1 = require("../automatic-refactoring/automatic-refactoring");
var _a = require('worker_threads'), parentPort = _a.parentPort, workerData = _a.workerData;
function run() {
    options_model_1.Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    automatic_refactoring_1.AutomaticRefactoring.start(workerData.astFolder);
    parentPort.postMessage(undefined);
}
run();
