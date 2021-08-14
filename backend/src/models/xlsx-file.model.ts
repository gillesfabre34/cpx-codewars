import { Sheet } from './sheet.model';

export class XlsxFile {

    path: string = undefined;
    sheets: Sheet[] = [];

    constructor(path: string, sheets: Sheet[] = []) {
        this.path = path;
        this.sheets = sheets;
    }

}
