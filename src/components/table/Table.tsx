import type { ITableProps } from './Table.types';
import { Text } from '../text/Text';
import styles from './Table.module.scss';

export const Table = ({ data }: ITableProps) => {
  return (
    <div className={styles.table}>
      <table>
        <thead className={styles['table-title']}>
          <tr>
            <th scope="col">MSISDN(Voice)</th>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Ime i prezime - privatni račun</th>
            <th scope="col">Account/Contract</th>
            <th scope="col">Regija</th>
            <th scope="col">Podružnica</th>
            <th scope="col">Tarifni model</th>
            <th scope="col">Skraćeni broj (Voice)</th>
            <th scope="col">Status pretplate</th>
            <th scope="col">VPN profil</th>
            <th scope="col">Broj SIM kartice</th>
            <th scope="col">VPN privat bill</th>
            <th scope="col">IMSI number</th>
            <th scope="col">MCD/CP broj preostalih mjesečnih naknada</th>
            <th scope="col">Mjesec isteka MCD/CP</th>
          </tr>
        </thead>
        <tbody className={styles['table-data']}>
          {data.map((row) => (
            <tr key={row.msisdn}>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'bold'}>
                  {row.msisdn}
                </Text>
              </td>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'bold'}>
                  {row.name}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'bold'}>
                  {row.surname}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'medium'}>
                  {row.fullName ?? '-'}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.account}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.region}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.branch}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.tariff}
                </Text>
              </td>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.voice}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'medium'}>
                  {row.status}
                </Text>
              </td>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.profile}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.simNumber}
                </Text>
              </td>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.privateBill}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.imsi}
                </Text>
              </td>

              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.remainingFee}
                </Text>
              </td>
              <td>
                <Text component={'p'} size={'paragraph-s'} color={'primary'} weight={'regular'}>
                  {row.period}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
