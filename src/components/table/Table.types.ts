export type RawUserRow = {
  'MSISDN (Voice)': string;
  'Account/Contract': string;
  REGIJA: string;
  PODRUŽNICA: string;
  IME: string;
  PREZIME: string;
  'Ime i prezime (u slučaju privatnog računa)': string;
  'Tarifni model': string;
  'skraćeni broj (Voice)': string;
  'Status pretplatnika': string;
  'VPN Profil': string;
  'MCD/CP - broj preosatlih mjesečnih naknada': number;
  'mjesec isteka MCD/CP ': string | number;
  'Broj Sim kartice': string;
  'VPN Private bill (Y/N)': string;
  'Imsi Number': string;
};

export type ITableRow = {
  id?: number;
  msisdn: string;
  account: string;
  region: string;
  branch: string;
  name: string;
  surname: string;
  fullName?: string;
  tariff: string;
  voice: string;
  status: string;
  profile: string;
  remainingFee: number;
  period: string | number;
  simNumber: string;
  privateBill: string;
  imsi: string;
};

export const mapUsers = (rawRows: RawUserRow[]): ITableRow[] => {
  return rawRows.map((row) => ({
    fullName: row['Ime i prezime (u slučaju privatnog računa)'],

    account: row['Account/Contract'],

    region: row.REGIJA,

    branch: row.PODRUŽNICA,

    msisdn: row['MSISDN (Voice)'],

    name: row.IME,

    surname: row.PREZIME,

    tariff: row['Tarifni model'],

    voice: row['skraćeni broj (Voice)'],

    status: row['Status pretplatnika'],

    profile: row['VPN Profil'],

    remainingFee: row['MCD/CP - broj preosatlih mjesečnih naknada'],

    period: row['mjesec isteka MCD/CP '],

    simNumber: row['Broj Sim kartice'],

    privateBill: row['VPN Private bill (Y/N)'],

    imsi: row['Imsi Number'],
  }));
};

export type SupabaseUser = {
  id: number;
  msisdn: string;
  account: string;
  region: string;
  branch: string;
  name: string;
  surname: string;
  full_name: string | null;
  tariff: string;
  voice: string;
  status: string;
  profile: string;
  remaining_fee: number;
  period: string | number;
  sim_number: string;
  private_bill: string;
  imsi: string;
};

export interface ITableProps {
  data: ITableRow[];
  onEdit: (user: ITableRow) => void;
  onDelete: (id: number) => void;
}
