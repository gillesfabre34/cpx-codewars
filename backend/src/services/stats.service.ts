import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { CONFIG } from '../const/config';
import { CellAddress, CellObject, WorkBook, WorkSheet } from 'xlsx';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { existsSync } from '../utils/file-system.util';
import { DataTable } from '../models/data-table.model';
import { Row } from '../types/row.model';
import { DATASET } from '../const/dataset.const';
import { flat } from '../../../shared/utils/arrays.util';


export class StatsService {

    static XLSX = require('xlsx');

    static async createCsvStats(): Promise<void> {
        console.log(chalk.cyanBright('START STATS'));
        const kles: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        await this.createCsvDataset(kles);
        console.log(chalk.cyanBright('END STATS'));
    }

    private static async createCsvDataset(kles: KataLanguageEntity[]): Promise<void> {
        if (!existsSync(DATASET.path)) {
            await this.createCsvFile();
        }
        const dataTable: DataTable = flat(DATASET.sheets.map(s => s.dataTables)).find(d => d.name === 'solutions');
        await this.setDataToCsvFile(kles, dataTable);
    }

    private static async createCsvFile(): Promise<void> {
        const wb: WorkBook = this.XLSX.utils.book_new();
        wb.SheetNames.push('Solutions');
        this.XLSX.writeFile(wb, DATASET.path);
    }

    private static async setDataToCsvFile(kles: KataLanguageEntity[], dataTable: DataTable): Promise<void> {
        this.setSheetTitle('Kata solutions');
        this.setTableHeader(dataTable);
        this.setTableContent(dataTable, kles);
    }

    private static setSheetTitle(title: string): void {
        this.updateCsv('Solutions', [['', title]]);
    }

    private static setTableHeader(dataTable: DataTable): void {
        this.updateCsv('Solutions', [dataTable.header], dataTable.topLeft);
    }

    private static setTableContent(dataTable: DataTable, kles: KataLanguageEntity[]): void {
        const rows: Row[] = [];
        const contentTopLeft: CellAddress = this.XLSX.utils.encode_cell({c: dataTable.topLeft.c, r: dataTable.topLeft.r + 1});
        for (let kleRank = 0; kleRank < kles.length; kleRank++) {
            rows.push(...this.getKleRows(kles[kleRank], kleRank));
        }
        this.updateCsv('Solutions', rows, contentTopLeft);
    }

    private static getKleRows(kle: KataLanguageEntity, kleRank: number): Row[] {
        const nbOfRowsByKle = 3;
        const rows: Row[] = [];
        for (let solutionRank = 0; solutionRank < nbOfRowsByKle; solutionRank++) {
            // const newRow: Row = this.getSolutionRow(kle.solutionEntities[solutionRank], kle.id, kleRank);
            rows.push(this.getSolutionRow(kle.solutionEntities[solutionRank], kle.id, kleRank));
        }
        this.addPercentageStats(rows);
        return rows;
    }

    private static getSolutionRow(solutionEntity: SolutionEntity, kleId: number, solutionRank: number): Row {
        const kleIdCell: CellObject = {t: 's', v: kleId.toString()};
        const solRankCell: CellObject = {t: 'n', v: (solutionRank + 1).toString()};
        const bestPracticesCell: CellObject = {t: 'n', v: solutionEntity.bestPractices};
        const cleverCell: CellObject = {t: 'n', v: solutionEntity.clever};
        const cpxCell: CellObject = {t: 'n', v: solutionEntity.cpx};
        return [kleIdCell, solRankCell, bestPracticesCell, cleverCell, cpxCell];
    }

    private static addPercentageStats(rows: Row[]): void {
        for (let i = 0; i < rows.length; i++) {
            let bpPercentage: number = 100 * +rows[i][2]['v'] / +rows[0][2]['v'];
            let cpxPercentage: number = 100 * +rows[i][4]['v'] / +rows[0][4]['v'];
            bpPercentage = isNaN(bpPercentage) ? 0 : bpPercentage;
            cpxPercentage = isNaN(cpxPercentage) ? 0 : cpxPercentage;
            const bpPercentageCell: CellObject = {t: 'n', v: bpPercentage.toString()};
            const cpxPercentageCell: CellObject = {t: 'n', v: cpxPercentage.toString()};
            rows[i].push(...[bpPercentageCell, cpxPercentageCell]);
        }

    }

    private static updateCsv(sheetName: string, rows: Row[], origin?: CellAddress): void {
        const wb: WorkBook = this.XLSX.readFile(DATASET.path);
        let sheet: WorkSheet = wb.Sheets[sheetName];
        origin = origin || {c: 0, r: 0};
        this.XLSX.utils.sheet_add_aoa(sheet, rows, {origin: origin});
        this.XLSX.writeFile(wb, DATASET.path);
    }
}
