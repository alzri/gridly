import * as XLSX from 'xlsx';
import type { ITableRow, RawUserRow } from '@/components/table/Table.types';
import { EXCEL_COLUMNS } from './excel.types';

export const exportExcel = (data: ITableRow[]) => {
  const rows: RawUserRow[] = data.map((row) => ({
    'MSISDN (Voice)': row.msisdn,
    'Account/Contract': row.account,
    REGIJA: row.region,
    PODRUŽNICA: row.branch,
    IME: row.name,
    PREZIME: row.surname,
    'Ime i prezime (u slučaju privatnog računa)': row.fullName ?? '',
    'Tarifni model': row.tariff,
    'skraćeni broj (Voice)': row.voice,
    'Status pretplatnika': row.status,
    'VPN Profil': row.profile,
    'MCD/CP - broj preosatlih mjesečnih naknada': row.remainingFee,
    'mjesec isteka MCD/CP ': row.period,
    'Broj Sim kartice': row.simNumber,
    'VPN Private bill (Y/N)': row.privateBill,
    'Imsi Number': row.imsi,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: EXCEL_COLUMNS,
  });

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

  XLSX.writeFile(workbook, 'users.xlsx');
};
