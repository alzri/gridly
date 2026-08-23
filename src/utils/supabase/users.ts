import { supabase } from './client';
import type { ITableRow, SupabaseUser } from '@/components/table/Table.types';

const mapSupabaseUser = (user: SupabaseUser): ITableRow => ({
  id: user.id,
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
});

export const saveUsers = async (users: ITableRow[]): Promise<ITableRow[]> => {
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

  return (data ?? []).map(mapSupabaseUser);
};

export const getUsers = async (): Promise<ITableRow[]> => {
  const { data, error } = await supabase.from('users').select('*').order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapSupabaseUser);
};

export const updateUser = async (id: number, user: ITableRow): Promise<ITableRow> => {
  const { data, error } = await supabase
    .from('users')
    .update({
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
    })
    .eq('id', id)
    .select();

  console.log('UPDATE ID:', id);
  console.log('UPDATE DATA:', data);
  console.log('UPDATE ERROR:', error);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error(`User with id "${id}" could not be updated. Check RLS UPDATE policy.`);
  }

  return mapSupabaseUser(data[0]);
};

export const deleteUser = async (id: number) => {
  const { error } = await supabase.from('users').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
