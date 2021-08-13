import * as chalk from 'chalk';
import { SolutionsEntityService } from './solutions-entity.service';
import { CONFIG } from '../const/config';
import { SolutionEntity } from '../entities/solution.entity';

const csv = require('csv-parser')
const fs = require('fs')

export class ImportCpxService {

    static async start(): Promise<void> {
        console.log(chalk.cyanBright('STARTTTT IMPORT'));
        const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions(CONFIG.language);
        console.log(chalk.magentaBright('SOLSSSSS'), solutionEntities?.length);
        const results = await this.getCsv();
        console.log(chalk.magentaBright('RESULTSSSSSSS'), results?.length);
    }

    private static async getCsv(): Promise<any> {
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

}
