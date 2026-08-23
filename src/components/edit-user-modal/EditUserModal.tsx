'use client';

import { useState } from 'react';
import type { ITableRow } from '@/components/table/Table.types';
import styles from './EditUserModal.module.scss';

interface EditUserModalProps {
  user: ITableRow;
  onSave: (user: ITableRow) => void;
  onClose: () => void;
}

export const EditUserModal = ({ user, onSave, onClose }: EditUserModalProps) => {
  const [formData, setFormData] = useState<ITableRow>(user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'remainingFee' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSave(formData);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <h2>Edit user</h2>

        <form onSubmit={handleSubmit}>
          <label>
            MSISDN
            <input name="msisdn" value={formData.msisdn} onChange={handleChange} />
          </label>

          <label>
            Ime
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Prezime
            <input name="surname" value={formData.surname} onChange={handleChange} />
          </label>

          <label>
            Account / Contract
            <input name="account" value={formData.account} onChange={handleChange} />
          </label>

          <label>
            Regija
            <input name="region" value={formData.region} onChange={handleChange} />
          </label>

          <label>
            Podružnica
            <input name="branch" value={formData.branch} onChange={handleChange} />
          </label>

          <label>
            Tarifni model
            <input name="tariff" value={formData.tariff} onChange={handleChange} />
          </label>

          <label>
            VPN profil
            <input name="profile" value={formData.profile} onChange={handleChange} />
          </label>

          <label>
            MCD/CP
            <input
              type="number"
              name="remainingFee"
              value={formData.remainingFee}
              onChange={handleChange}
            />
          </label>

          <label>
            IMSI
            <input name="imsi" value={formData.imsi} onChange={handleChange} />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
