import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { SolutionsEntityService } from './solutions-entity.service';
import { SolutionsStats } from '../models/solutions-stats.model';
import { CONFIG } from '../const/config';


export class StatsService {

    static async createCsvStats(): Promise<void> {
        console.log(chalk.blueBright('START STATSSSSS'));
        const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions();
        const solutionsStats: SolutionsStats[] = this.buildStatsTable(solutionEntities);
        await this.createStatsFile(solutionsStats);
    }

    private static buildStatsTable(solutionEntities: SolutionEntity[]): SolutionsStats[] {
        const solutionsStats: SolutionsStats[] = [];
        for (const solutionEntity of solutionEntities) {
            solutionsStats.push(this.buildStatsRow(solutionEntity));
        }
        return solutionsStats;
    }

    private static buildStatsRow(solutionEntity: SolutionEntity): SolutionsStats {
        const solutionsStats = new SolutionsStats();
        solutionsStats.id = solutionEntity.id.toString();
        solutionsStats.bestPractices = solutionEntity.bestPractices.toString();
        solutionsStats.clever = solutionEntity.clever.toString();
        solutionsStats.cpx = solutionEntity.cpx.toString();
        return solutionsStats;
    }

    private static async createStatsFile(solutionsStats: SolutionsStats[]): Promise<void> {
        console.log(chalk.magentaBright('CREATE XLSXXXXX'), solutionsStats?.slice(0, 2));
        const XLSX = require('xlsx');
        const wb = XLSX.utils.book_new();
        wb.SheetNames.push('Solutions');
        const rows: string[][] = [['', 'Kata solutions'], [], ['', 'id', 'bestPractices', 'clever', 'cpx']];
        const data: string[][] = solutionsStats.map(s => ['', s.id, s.bestPractices, s.clever, s.cpx]);
        rows.push(...data);
        let ws = XLSX.utils.aoa_to_sheet(rows);
        wb.Sheets['Solutions'] = ws;
        const path: string = `${CONFIG.root}/stats/dataset-cw.xlsx`;
        console.log(chalk.magentaBright('CREATE XLSXXXXX PATHHHH'), path);
        XLSX.writeFile(wb, path)
    }
}
