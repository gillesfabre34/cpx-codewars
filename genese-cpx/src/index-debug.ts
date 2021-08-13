#!/usr/bin/env node

import { Worker } from 'worker_threads';
import { Options } from './core/models/options.model';
import { createOutDir } from './core/services/file.service';
import { AstFolder } from './json-ast-to-reports/models/ast/ast-folder.model';
import * as chalk from 'chalk';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { Framework } from './core/types/framework.type';
import { Language } from './core/enum/language.enum';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';
import { ExportService } from './json-ast-to-reports/services/report/export.service';

const ora = require('ora');
const path = require('path');

const spinner = ora();

const ARGS: string[] = process.argv.slice(2);
const PATH_TO_ANALYSE = ARGS[0] ?? '.';
const LANGUAGE = ARGS[1] ?? 'ts';
const ENABLE_MARKDOWN_REPORT = ARGS[2] === 'true';
const ENABLE_CONSOLE_REPORT = ARGS[3] === 'true';
const ENABLE_REFACTORING = ARGS[4] === 'true';
let FRAMEWORK = ARGS[5] ?? undefined;
const DEBUG = true;

let pathToAnalyse: string;
if (path.isAbsolute(PATH_TO_ANALYSE)) {
    pathToAnalyse = PATH_TO_ANALYSE;
} else {
    pathToAnalyse = `${process.cwd()}/${PATH_TO_ANALYSE}`.split('/').filter(e => e !== '.').join('/');
}


start()
    .then(exitCode => {
        process.exit(exitCode)
    })
    .catch(err => {
        spinner.fail();
        console.log(err);
    })

async function start(): Promise<number> {
    if (DEBUG) {
        // pathToAnalyse = `${process.cwd()}/dist/solutions`;
        pathToAnalyse = `${process.cwd()}/genese-cpx/src/core/mocks/whole-file`;
        FRAMEWORK = 'react';
    }
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname);
    if (!ENABLE_CONSOLE_REPORT) {
        createOutDir();
    }
    console.log(chalk.yellowBright('AST generation...'));
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname, FRAMEWORK as Framework);
    LanguageToJsonAst.start(Options.pathFolderToAnalyze, LANGUAGE as Language)
    console.log(chalk.yellowBright('Report generation...'));
    const reportResult = JsonAstToReports.start(Options.pathCommand, undefined, ENABLE_MARKDOWN_REPORT, ENABLE_CONSOLE_REPORT);
    await ExportService.exportReport();
    if (reportResult?.length > 0) {
        console.log();
        if (typeof reportResult === 'object') {
            console.table(reportResult, ['filename', 'methodName', 'cpxIndex']);
        } else {
            const stats: any = JsonAstToReports.astFolder['_stats'];
            console.log(chalk.blueBright('Files : '), stats.numberOfFiles);
            console.log(chalk.blueBright('Methods : '), stats.numberOfMethods);
            console.log(chalk.blueBright('Comprehension Complexity : '), stats.totalCognitiveComplexity);
            console.log(chalk.blueBright('Cyclomatic Complexity : '), stats.totalCyclomaticComplexity);
            console.log(reportResult);
        }
        if (ENABLE_CONSOLE_REPORT) {
            return 1;
        }
    }
    return 0;
}


function useWorker(filepath, data): any {
    return new Promise((resolve, reject) => {
        const worker = new Worker(filepath, {workerData: data});

        worker.on('message', message => {
            resolve(message);
        });

        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
