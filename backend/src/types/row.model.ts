import { CellObject } from 'xlsx';

// export type Row = CellObject[];
export type Row = (string | CellObject)[];
