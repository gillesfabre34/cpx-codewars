import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { CONFIG } from '../const/config';
import { CellAddress, CellObject, WorkBook, WorkSheet } from 'xlsx';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { existsSync } from '../utils/file-system.util';
import { DataTable } from '../models/data-table.model';
import { Row } from '../types/row.model';
import { average, flat } from '../../../shared/utils/arrays.util';
import { DATASET } from '../const/dataset.const';


export class StatsService {

    static nbOfRowsByKle = 3;
    static sheet: WorkSheet = undefined;
    static XLSX = require('xlsx');
    static wb: WorkBook = StatsService.XLSX.readFile(DATASET.path);

    static async createCsvStats(): Promise<void> {
        console.log(chalk.cyanBright('START STATS'));
        await this.createCsvFile();
        await this.addDataToSolutionsSheet();
        console.log(chalk.cyanBright('END STATS'));
    }

    private static async createCsvFile(): Promise<void> {
        if (!existsSync(DATASET.path)) {
            const wb: WorkBook = this.XLSX.utils.book_new();
            this.addSheets();
            this.XLSX.writeFile(wb, DATASET.path);
        }
    }

    private static addSheets(): void {
        this.wb.SheetNames.push('Solutions');
    }

    private static async addDataToSolutionsSheet(): Promise<void> {
        this.sheet = StatsService.wb.Sheets['Solutions'];
        const dataTable: DataTable = flat(DATASET.sheets.map(s => s.dataTables)).find(d => d.name === 'solutions');
        const kles: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        this.setSolutionsTable(kles, dataTable);
        this.setMeansTable(kles, dataTable);
    }

    private static setSolutionsTable(kles: KataLanguageEntity[], dataTable: DataTable): void {
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
        const rows: Row[] = [];
        for (let solutionRank = 0; solutionRank < this.nbOfRowsByKle; solutionRank++) {
            rows.push(this.getSolutionRow(kle.solutionEntities[solutionRank], kle.id, solutionRank));
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

    private static getValuesBySolutionRank(firstRow: number, column: number): number[] {
        let values: number[] = [];
        for (let solutionRank = 0; solutionRank < this.nbOfRowsByKle; solutionRank++) {
            const cellAddress: string = this.XLSX.utils.encode_cell({c: column, r: firstRow + solutionRank});
            values.push(this.sheet[cellAddress]?.v)
        }
        return values;
    }

    private static setMeansTable(kles: KataLanguageEntity[], dataTable: DataTable): void {
        const sheet: WorkSheet = StatsService.wb.Sheets[dataTable.sheet.name];
        let sum = 0;
        let valuesForAllKlesBySolutionRank: number[][]= [];
        for (let kleIndex = 0; kleIndex < kles.length; kleIndex++) {
            const firstRow: number = dataTable.topLeft.r + 1 + kleIndex * this.nbOfRowsByKle;
            const cpxPercentColumn: number = dataTable.topLeft.c + 6;
            const firstCellAddress: string = this.XLSX.utils.encode_cell({c: cpxPercentColumn, r: firstRow});
            if (!this.isEqualToZero(firstCellAddress, sheet)) {
                const valuesBySolutionRank: number[] = this.getValuesBySolutionRank(firstRow, cpxPercentColumn);
                // const solutionRow: number = dataTable.topLeft.r + 1 + solutionRank + i * this.nbOfRowsByKle;
                // const cellAddress: string = this.XLSX.utils.encode_cell({c: cpxPercentColumn, r: solutionRow});
                // sum += sheet[cellAddress];
                // console.log(chalk.blueBright('CELLLL'), cellAddress, sheet[cellAddress]);
            }
        }
    }

    private static isEqualToZero(cellAddress: string, sheet: WorkSheet): boolean {
        // const firstRow = dataTable.topLeft.r + 1 + kleIndex * this.nbOfRowsByKle;
        // const cpxPercentColumn: number = dataTable.topLeft.c + 6;
        // const cellAddress: string = this.XLSX.utils.encode_cell({c: cpxPercentColumn, r: firstRow});
        // console.log(chalk.magentaBright('ZEROOOO'), sheet[cellAddress]?.v === '0');
        return sheet[cellAddress]?.v === '0';
    }

    private static updateCsv(sheetName: string, rows: Row[], origin?: CellAddress): void {
        // const sheet: WorkSheet = StatsService.wb.Sheets[sheetName];
        console.log(chalk.blueBright('SHEEEET'), Object.keys(this.sheet).length);
        origin = origin || {c: 0, r: 0};
        this.XLSX.utils.sheet_add_aoa(this.sheet, rows, {origin: origin});
        console.log(chalk.blueBright('SHEEEET 2'), Object.keys(this.sheet).length);
        this.XLSX.writeFile(this.wb, DATASET.path);
    }
}
