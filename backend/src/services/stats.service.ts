import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { SolutionsEntityService } from './solutions-entity.service';
import { SolutionsStats } from '../models/solutions-stats.model';
import { CONFIG } from '../const/config';
import { WorkBook, WorkSheet } from 'xlsx';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { existsSync } from '../utils/file-system.util';


export class StatsService {

    static async createCsvStats(): Promise<void> {
        console.log(chalk.blueBright('START STATSSSSS'));
        const kles: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        // const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions();
        const solutionsStats: SolutionsStats[] = this.buildStatsTable(kles);
        await this.createCsvDataset(solutionsStats);
    }

    private static buildStatsTable(kles: KataLanguageEntity[]): SolutionsStats[] {
        const solutionsStats: SolutionsStats[] = [];
        for (const kle of kles) {
            solutionsStats.push(this.buildStatsRowByKle(kle));
        }
        return solutionsStats;
    }

    private static buildStatsRowByKle(kle: KataLanguageEntity): SolutionsStats {
        const solutionStats = new SolutionsStats();
        solutionStats.kleId = kle.id.toString();
        for (const solutionEntity of kle.solutionEntities) {
            this.setSolutionData(solutionEntity, solutionStats);
        }
        return solutionStats;
    }

    private static setSolutionData(solutionEntity: SolutionEntity, solutionStats: SolutionsStats): void {
        solutionStats.solutionId = solutionEntity.id.toString();
        solutionStats.bestPractices = solutionEntity.bestPractices.toString();
        solutionStats.clever = solutionEntity.clever.toString();
        solutionStats.cpx = solutionEntity.cpx.toString();
    }

    private static async createCsvDataset(solutionsStats: SolutionsStats[]): Promise<void> {
        const path: string = `${CONFIG.root}/stats/dataset-cw.xlsx`;
        const XLSX = require('xlsx');
        if (!existsSync(path)) {
            await this.createCsvFile(path, XLSX);
        }
        await this.setDataToCsvFile(solutionsStats, path, XLSX);
    }

    private static async createCsvFile(path: string, XLSX): Promise<void> {
        console.log(chalk.magentaBright('CREATE XLSXXXXX'));
        const wb = XLSX.utils.book_new();
        wb.SheetNames.push('Solutions');
        const rows: string[][] = [['', 'Kata solutions'], [], ['', 'kata', 'solution', 'bestPractices', 'clever', 'cpx']];
        // const data: string[][] = solutionsStats.map(s => ['', s.solutionId, s.bestPractices, s.clever, s.cpx]);
        // rows.push(...data);
        let ws = XLSX.utils.aoa_to_sheet(rows);
        wb.Sheets['Solutions'] = ws;
        // console.log(chalk.magentaBright('CREATE XLSXXXXX PATHHHH'), path);
        XLSX.writeFile(wb, path);
    }

    private static async setDataToCsvFile(solutionsStats: SolutionsStats[], path: string, XLSX): Promise<void> {
        console.log(chalk.cyanBright('UPDATE XLSXXXXX'), solutionsStats?.slice(0, 2));
        const wb: WorkBook = XLSX.readFile(path);
        const sheet: WorkSheet = wb.Sheets['Solutions'];
        console.log(chalk.blueBright('sheet namesssss'), sheet['E4']);
        sheet['E4'] = {t: 's', v: 'zzz'};
        XLSX.writeFile(wb, path);
    }
}
