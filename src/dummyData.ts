import type { ITableRow } from '@/components/table/Table.types';

export const dummyData: ITableRow[] = [
  {
    msisdn: '12343',
    account: '1',
    region: 'Zagreb',
    branch: 'Zagreb - glavni kolodvor',
    name: 'Pero',
    surname: 'Perić',
    fullName: 'Ivka Perić',
    tariff: 'SPVH Mini',
    voice: 'w32333',
    status: 'active',
    profile: 'Sve',
    remainingFee: 5,
    period: '202701',
    simNumber: '098765432',
    privateBill: 'N',
    imsi: '3422144',
  },
  {
    msisdn: '1233343',
    account: '27679957',
    region: 'Zagreb',
    branch: 'Zagreb - istok',
    name: 'Ana',
    surname: 'Katić',
    fullName: '',
    tariff: 'SPVH Extra',
    voice: 'w32dd333',
    status: 'inactive',
    profile: 'Sve',
    remainingFee: 0,
    period: '202605',
    simNumber: '0987654535',
    privateBill: 'Y',
    imsi: '3422165',
  },
];

export default dummyData;
