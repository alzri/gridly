import { supabase } from './client';
import type { ITableRow } from '@/components/table/Table.types';

export const saveUsers = async (users: ITableRow[]) => {
  const { data, error } = await supabase
    .from('users')
    .insert(
      users.map((user) => ({
        msisdn: user.msisdn,
        account: user.account,
        region: user.region,
        branch: user.branch,
        name: user.name,
        surname: user.surname,
        full_name: user.fullName ?? null,
        tariff: user.tariff,
        voice: user.voice,
        status: user.status,
        profile: user.profile,
        remaining_fee: user.remainingFee,
        period: user.period,
        sim_number: user.simNumber,
        private_bill: user.privateBill,
        imsi: user.imsi,
      }))
    )
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUsers = async (): Promise<ITableRow[]> => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((user) => ({
    msisdn: user.msisdn,
    account: user.account,
    region: user.region,
    branch: user.branch,
    name: user.name,
    surname: user.surname,
    fullName: user.full_name ?? undefined,
    tariff: user.tariff,
    voice: user.voice,
    status: user.status,
    profile: user.profile,
    remainingFee: user.remaining_fee,
    period: user.period,
    simNumber: user.sim_number,
    privateBill: user.private_bill,
    imsi: user.imsi,
  }));
};
