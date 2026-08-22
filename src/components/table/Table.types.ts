export type TariffType = 'SPVH Mini' | 'SPVH Extra' | 'SPVH Premium' | 'MI Best' | 'MI Top';

export type RawUserRow = {
  'ime i prezime (u slučaju privatnog računa)': string;
  'account/username': string;
  'Account/Contract': number;
  Regija: string;
  Podružnica: string;
  MSISDN: string;
  Ime: string;
  Prezime: string;
  'Tarifni model': TariffType;
  'skraćeni broj(Voice)': string;
  'status pretplatnika': string;
  'VPN profil': string;
  'MCD/CP - broj preostalih mjesećnih nadnada': number;
  'mjesec isteka MCD/CP': string;
  'Broj Sim kartice': string;
  'VPN Private bill (Y/N)': string;
  'Imsi Number': number;
};

export type ITableRow = {
  msisdn: string;
  account: number;
  region: string;
  branch: string;
  name: string;
  surname: string;
  fullName?: string;
  tariff: TariffType;
  voice: string;
  status: string;
  profile: string;
  remainingFee: number;
  period: string;
  simNumber: string;
  privateBill: string;
  imsi: number;
};

export const mapUsers = (rawRows: RawUserRow[]): ITableRow[] => {
  return rawRows.map((row) => ({
    fullName: row['ime i prezime (u slučaju privatnog računa)'],
    account: row['Account/Contract'],
    region: row['Regija'],
    branch: row['Podružnica'],
    msisdn: row['MSISDN'],
    name: row['Ime'],
    surname: row['Prezime'],
    tariff: row['Tarifni model'] as TariffType,
    voice: row['skraćeni broj(Voice)'],
    status: row['status pretplatnika'],
    profile: row['VPN profil'],
    remainingFee: row['MCD/CP - broj preostalih mjesećnih nadnada'],
    period: row['mjesec isteka MCD/CP'],
    simNumber: row['Broj Sim kartice'],
    privateBill: row['VPN Private bill (Y/N)'],
    imsi: row['Imsi Number'],
  }));
};

export interface ITableProps {
  data: ITableRow[];
}
