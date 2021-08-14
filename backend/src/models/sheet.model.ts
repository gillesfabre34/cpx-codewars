import { DataTable } from './data-table.model';
import { XlsxFile } from './xlsx-file.model';

export class Sheet {

    dataTables: DataTable[] = [];
    name: string = undefined;
    xlsxFile: XlsxFile = undefined;

    constructor(name: string, xlsxFile: XlsxFile) {
        this.name = name;
        this.xlsxFile = xlsxFile;
    }
}
