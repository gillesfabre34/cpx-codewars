import { DataTable } from './data-table.model';

export class Config {
    cookie: string;
    cwId: string;
    dataTables: DataTable[] = [];
    language: string;
    root: string;
    sendRequest: boolean;
}
