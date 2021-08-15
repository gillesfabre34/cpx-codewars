import { XlsxFile } from '../models/xlsx-file.model';
import { Sheet } from '../models/sheet.model';
import { DataTable } from '../models/data-table.model';

export class XlsxService {

    static create(path: string, sheetName: string, dataTable?: DataTable): XlsxFile {
        const xlsx = new XlsxFile(path);
        const sheet = new Sheet(sheetName, xlsx);
        if (dataTable) {
            dataTable.sheet = sheet;
            sheet.dataTables.push(dataTable);
        }
        xlsx.sheets.push(sheet);
        return xlsx;
    }
}
