import { RawUserRow } from '@/components/table/Table.types';

export const EXCEL_COLUMNS: (keyof RawUserRow)[] = [
  'MSISDN (Voice)',
  'Account/Contract',
  'REGIJA',
  'PODRUŽNICA',
  'IME',
  'PREZIME',
  'Ime i prezime (u slučaju privatnog računa)',
  'Tarifni model',
  'skraćeni broj (Voice)',
  'Status pretplatnika',
  'VPN Profil',
  'MCD/CP - broj preosatlih mjesečnih naknada',
  'mjesec isteka MCD/CP ',
  'Broj Sim kartice',
  'VPN Private bill (Y/N)',
  'Imsi Number',
];

export const REQUIRED_FIELDS: (keyof RawUserRow)[] = [
  'MSISDN (Voice)',
  'IME',
  'PREZIME',
  'REGIJA',
  'PODRUŽNICA',
  'Account/Contract',
  'Imsi Number',
  'Tarifni model',
];
