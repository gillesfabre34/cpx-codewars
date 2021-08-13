import * as chalk from 'chalk';
import { METHOD_REPORTS } from '../../global/method-reports.global';
import { MethodReport } from '../../models/report/method-report.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { CsvExportRow } from '../../models/report/csv-export.model';
import { CSV_EXPORT } from '../../global/csv-export.global';

export class ExportService {

    static async exportReport(): Promise<void> {
        console.log(chalk.greenBright('START EXPORTTTT'), CSV_EXPORT);
    }


    static addRows(methodReports: MethodReport[], astFile: AstFile): void {
        console.log(chalk.magentaBright('LGTH METHODS ARRRRRR'), methodReports?.length);
        for (const methodReport of methodReports) {
            this.addRow(methodReport, astFile);
        }
    }


    private static addRow(methodReport: MethodReport, astFile: AstFile): void {
        console.log(chalk.magentaBright('LGTH METHODS ARRRRRR'), methodReport.name);
        const csvExportRow = new CsvExportRow();
        csvExportRow.complexity = methodReport.cpxIndex?.toString();
        csvExportRow.fileName = astFile.name;
        csvExportRow.folderPath = astFile.astFolder.relativePath;
        csvExportRow.functionName = methodReport.name;
            CSV_EXPORT.push(csvExportRow);

    }
}
