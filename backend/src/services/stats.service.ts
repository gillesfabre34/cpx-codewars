import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { SolutionsEntityService } from './solutions-entity.service';
import { SolutionsStats } from '../models/solutions-stats.model';
import { CONFIG } from '../const/config';
import { CellAddress, CellObject, WorkBook, WorkSheet } from 'xlsx';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { existsSync } from '../utils/file-system.util';
import { Cell } from '../types/cell.type';
import { DataTable } from '../models/data-table.model';


export class StatsService {

    static XLSX = require('xlsx');

    static async createCsvStats(): Promise<void> {
        console.log(chalk.blueBright('START STATSSSSS'));
        const kles: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        // const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions();
        // const solutionsStats: SolutionsStats[] = this.buildStatsTable(kles);
        await this.createCsvDataset(kles);
        console.log(chalk.yellowBright('END STATSSSSS'));
    }

    private static async createCsvDataset(kles: KataLanguageEntity[]): Promise<void> {
        const path: string = `${CONFIG.root}/stats/dataset-cw.xlsx`;
        // const XLSX = require('xlsx');
        if (!existsSync(path)) {
            await this.createCsvFile(path, this.XLSX);
        }
        await this.setDataToCsvFile(kles, path, this.XLSX);
    }

    private static async createCsvFile(path: string, XLSX): Promise<void> {
        const wb = XLSX.utils.book_new();
        wb.SheetNames.push('Solutions');
        const rows: string[][] = [['', 'Kata solutions'], [], ['', 'kata_id', 'solution', 'best_practices', 'clever', 'cpx']];
        wb.Sheets['Solutions'] = XLSX.utils.aoa_to_sheet(rows);
        XLSX.writeFile(wb, path);
    }

    private static async setDataToCsvFile(kles: KataLanguageEntity[], path: string, XLSX): Promise<void> {
        const wb: WorkBook = XLSX.readFile(path);
        const sheet: WorkSheet = wb.Sheets['Solutions'];
        for (let kleRank = 0; kleRank < kles.length; kleRank++) {
            this.addRow(sheet, kles[kleRank], kleRank);
        }
        await XLSX.writeFile(wb, path);
    }

    private static addRow(sheet: WorkSheet, kle: KataLanguageEntity, kleRank: number): void {
        const nbOfRowsByKle = 3;
        for (let solutionRank = 0; solutionRank < nbOfRowsByKle; solutionRank++) {
            this.setSolutionData(sheet, kle.solutionEntities[solutionRank], kle.id, kleRank, solutionRank, nbOfRowsByKle);
        }
    }

    private static setSolutionData(sheet: WorkSheet, solutionEntity: SolutionEntity, kleId: number, kleRank: number, solutionRank: number, nbOfRowsByKle: number): void {
        const dataTable: DataTable = CONFIG.dataTables.find(d => d.name === 'solutions');
        const top: number = dataTable.top;
        const left: number = dataTable.left;
        const row: number = (kleRank * nbOfRowsByKle) + solutionRank + top;
        const col: string = String.fromCharCode( left + 64);
        const kleIdCell = `${col}${row}`;
        const solRankCell = `${col + 1}${row}`;
        const bestPracticesCell = `${col + 2}${row}`;
        const cleverCell = `${col + 3}${row}`;
        const cpxCell = `${col + 4}${row}`;
        sheet[kleIdCell] = {t: 's', v: kleId.toString()};
        const XLSX = require('xlsx');
        sheet[solRankCell] = {t: 'n', v: (solutionRank + 1).toString()};
        sheet[bestPracticesCell] = {t: 'n', v: solutionEntity.bestPractices};
        sheet[cleverCell] = {t: 'n', v: solutionEntity.clever};
        sheet[cpxCell] = {t: 'n', v: solutionEntity.cpx};
        XLSX.utils.sheet_add_aoa(sheet, [[sheet[kleIdCell], sheet[solRankCell], sheet[bestPracticesCell], sheet[cleverCell], sheet[cpxCell]]], {origin: kleIdCell});
    }
}
