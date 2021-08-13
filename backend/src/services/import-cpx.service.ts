import * as chalk from 'chalk';
import { SolutionsEntityService } from './solutions-entity.service';
import { CONFIG } from '../const/config';
import { SolutionEntity } from '../entities/solution.entity';
import { CsvImportRow } from '../models/csv-import-row.model';
import { removeExtension } from '../utils/file-system.util';

const csv = require('csv-parser')
const fs = require('fs')

export class ImportCpxService {

    static async start(): Promise<void> {
        console.log(chalk.cyanBright('STARTTTT IMPORT'));
        const csvImportRows: CsvImportRow[] = await this.getCsv();
        const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions(CONFIG.language);
        console.log(chalk.magentaBright('RESULTSSSSSSS'), csvImportRows?.slice(0,5));
        this.setCpxToSolutions(solutionEntities, csvImportRows);
    }

    private static async getCsv(): Promise<CsvImportRow[]> {
        const results = [];
        const csvPath: string = `${CONFIG.root}/genese/complexity/reports/cpx-report.csv`;
        return new Promise((resolve, reject) => {
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                })
                .on('error', reject);
            });
    }

    private static setCpxToSolutions(solutionEntities: SolutionEntity[], csvImportRows: CsvImportRow[]): void {
        for (const solutionEntity of solutionEntities) {
            this.setCpxToSolution(solutionEntity, csvImportRows);
        }
    }

    private static setCpxToSolution(solutionEntity: SolutionEntity, csvImportRows: CsvImportRow[]): void {
        const rowsFile: CsvImportRow[] = csvImportRows.filter(c => removeExtension(c.file) === solutionEntity.id.toString());
        let fileCpx: number = this.getFileCpx(rowsFile);
        console.log(chalk.greenBright('FILE CPXXXX'), solutionEntity.id, rowsFile?.length, fileCpx);
    }

    private static getFileCpx(rows: CsvImportRow[]): number {
        return +rows.map(r => +r.cpx).reduce((a, b) => a + b, 0).toFixed(1);
    }

}
