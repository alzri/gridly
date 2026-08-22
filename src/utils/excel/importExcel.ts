import * as XLSX from 'xlsx';

import type { RawUserRow, ITableRow } from '@/components/table/Table.types';

import { mapUsers } from '@/components/table/Table.types';
import { REQUIRED_FIELDS, EXCEL_COLUMNS } from './excel.types';

const isEmpty = (value: unknown) =>
  value === undefined || value === null || String(value).trim() === '';

const validateRow = (row: RawUserRow, rowIndex: number): string[] => {
  const excelRow = rowIndex + 3;

  const errors = REQUIRED_FIELDS.filter((field) => isEmpty(row[field])).map(
    (field) => `Row ${excelRow}: ${String(field)} is required.`
  );

  const mcd = row['MCD/CP - broj preosatlih mjesečnih naknada'];

  if (typeof mcd !== 'number' || Number.isNaN(mcd)) {
    errors.push(`Row ${excelRow}: MCD/CP must be a number.`);
  }

  return errors;
};

export const importExcel = async (file: File): Promise<ITableRow[]> => {
  if (!/\.(xlsx|xls)$/i.test(file.name)) {
    throw new Error('Invalid file format. Please select an Excel file.');
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, {
    type: 'array',
  });

  if (!workbook.SheetNames.length) {
    throw new Error('The Excel file does not contain any sheets.');
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  if (!worksheet) {
    throw new Error('Could not read the first worksheet.');
  }

  const sheet = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
    header: 1,
    defval: '',
  });

  if (sheet.length < 3) {
    throw new Error('The Excel file does not contain enough data.');
  }

  const headers = sheet[1] as string[];

  const missingColumns = EXCEL_COLUMNS.filter((column) => !headers.includes(column));

  if (missingColumns.length) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  const rawRows: RawUserRow[] = sheet
    .slice(2)
    .filter((row) => row.some((cell) => !isEmpty(cell)))
    .map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, row[index]]))
    ) as RawUserRow[];

  const errors = rawRows.flatMap(validateRow);

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  return mapUsers(rawRows);
};
