import { XlsxFile } from '../models/xlsx-file.model';
import { XlsxService } from '../services/xlsx.service';
import { CONFIG } from './config';
import { DataTable } from '../models/data-table.model';

export const DATASET: XlsxFile = XlsxService.create(
    `${CONFIG.root}/stats/dataset-cw.xlsx`,
    'Solutions',
    new DataTable('solutions', {c: 1, r: 3}, ['kata_id', 'solution', 'best_practices', 'clever', 'cpx', 'bp_percent', 'cpx_percent']));
