import * as chalk from 'chalk';
import { SolutionEntity } from '../entities/solution.entity';
import { CONFIG } from '../const/config';
import { CellAddress, CellObject, WorkBook, WorkSheet } from 'xlsx';
import { KataLanguageEntityService } from './kata-language-entity.service';
import { KataLanguageEntity } from '../entities/kata-language.entity';
import { existsSync } from '../utils/file-system.util';
import { DataTable } from '../models/data-table.model';
import { Row } from '../types/row.model';
import { XlsxService } from './xlsx.service';
import { DATASET } from '../const/dataset.const';
import { flat } from '../../../shared/utils/arrays.util';


export class StatsService {

    static XLSX = require('xlsx');

    static async createCsvStats(): Promise<void> {
        console.log(chalk.blueBright('START STATSSSSS'));
        const kles: KataLanguageEntity[] = await KataLanguageEntityService.findAllKataLanguage(CONFIG.language);
        await this.createCsvDataset(kles);
        console.log(chalk.yellowBright('END STATSSSSS'));
    }

    private static async createCsvDataset(kles: KataLanguageEntity[]): Promise<void> {
        // const path: string = `${CONFIG.root}/stats/dataset-cw.xlsx`;
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
        const wb: WorkBook = this.XLSX.readFile(DATASET.path);
        let sheet: WorkSheet = wb.Sheets[dataTable.name.toUpperCase()];
        this.updateCsv(this.setSheetTitle('Kata solutions'));
        // this.setTableHeader(sheet, dataTable);
        // this.setTableContent(sheet, dataTable, kles);
        console.log(chalk.blueBright('SHEETS CELSSS'), sheet);
        // console.log(chalk.blueBright('SHEETS CELSSS'), Object.keys(sheet));
        // wb.Sheets[dataTable.name.toUpperCase()] = sheet;
        // await this.XLSX.writeFile(wb, path);
    }

    private static setSheetTitle(title: string): Row[] {
        return [['', title]];
        // this.updateCsv(titleRow);
    }

    private static updateCsv(rows: Row[]) {
    // private static updateCsv(dataTable: DataTable, rows: Row[]) {
        const path: string = `${CONFIG.root}/stats/dataset-cw.xlsx`;
        const wb: WorkBook = this.XLSX.readFile(path);
        let sheet: WorkSheet = wb.Sheets['Solutions'];
        // let sheet: WorkSheet = wb.Sheets[dataTable.name.toUpperCase()];
        this.XLSX.utils.sheet_add_aoa(sheet, rows);
        this.XLSX.writeFile(wb, path);
    }

    private static setTableHeader(sheet: WorkSheet, dataTable: DataTable): void {
        this.XLSX.utils.sheet_add_aoa(sheet, [dataTable.header], {origin: dataTable.topLeft});
    }

    private static setTableContent(sheet: WorkSheet, dataTable: DataTable, kles: KataLanguageEntity[]): void {
        const rows: Row[] = [];
        const contentTopLeft: CellAddress = this.XLSX.utils.encode_cell({c: dataTable.topLeft.c, r: dataTable.topLeft.r + 1});
        for (let kleRank = 0; kleRank < kles.length; kleRank++) {
            rows.push(...this.getKleRows(kles[kleRank], kleRank));
        }
        this.XLSX.utils.sheet_add_aoa(sheet, rows, {origin: contentTopLeft});
    }

    private static getKleRows(kle: KataLanguageEntity, kleRank: number): Row[] {
        const nbOfRowsByKle = 3;
        const rows: Row[] = [];
        for (let solutionRank = 0; solutionRank < nbOfRowsByKle; solutionRank++) {
            rows.push(this.getSolutionRow(kle.solutionEntities[solutionRank], kle.id, kleRank, solutionRank, nbOfRowsByKle));
        }
        return rows;
    }

    private static getSolutionRow(solutionEntity: SolutionEntity, kleId: number, kleRank: number, solutionRank: number, nbOfRowsByKle: number): Row {
        const kleIdCell: CellObject = {t: 's', v: kleId.toString()};
        const solRankCell: CellObject = {t: 'n', v: (solutionRank + 1).toString()};
        const bestPracticesCell: CellObject = {t: 'n', v: solutionEntity.bestPractices};
        const cleverCell: CellObject = {t: 'n', v: solutionEntity.clever};
        const cpxCell: CellObject = {t: 'n', v: solutionEntity.cpx};
        const solutionRow: Row = [kleIdCell, solRankCell, bestPracticesCell, cleverCell, cpxCell];
        // XLSX.utils.sheet_add_aoa(sheet, header);
        // XLSX.utils.sheet_add_aoa(sheet, [[sheet[kleIdCell], sheet[solRankCell], sheet[bestPracticesCell], sheet[cleverCell], sheet[cpxCell]]], {origin: kleIdCell});
        return solutionRow;
    }
}
