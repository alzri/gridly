'use client';
import { Text } from '@/components/text/Text';
import styles from './page.module.css';
import { Table } from '@/components/table/Table';
import { Button } from '@/components/button/Button';
import { useEffect, useRef, useState } from 'react';
import { importExcel } from '@/utils/excel/importExcel';
import { exportExcel } from '@/utils/excel/exportExcel';
import { getUsers, saveUsers, updateUser, deleteUser } from '@/utils/supabase/users';
import { ITableRow } from '@/components/table/Table.types';
import { EditUserModal } from '@/components/edit-user-modal/EditUserModal';

export default function Home() {
  const [data, setData] = useState<ITableRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingUser, setEditingUser] = useState<ITableRow | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();

        setData(users);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();
  }, []);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const importedData = await importExcel(file);

      const savedData = await saveUsers(importedData);

      setData(savedData);
    } catch (error) {
      console.error('Error importing Excel file:', error);
    }
  };

  const handleExport = () => {
    try {
      exportExcel(data);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  };

  const handleEdit = (user: ITableRow) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async (user: ITableRow) => {
    if (user.id === undefined) {
      console.error('Cannot update user without an id.');
      return;
    }

    try {
      const updatedUser = await updateUser(user.id, user);

      setData((currentData) =>
        currentData.map((item) => (item.id === updatedUser.id ? updatedUser : item))
      );

      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);

      setData((currentData) => currentData.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <Text size="h2" weight="bold" color="primary" component="h1">
            Welcome to Gridly!
          </Text>

          <div className={styles['CTA-buttons']}>
            <Button variant="import" onClick={handleImport}>
              Import data
            </Button>

            <Button variant="export" onClick={handleExport}>
              Export data
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            hidden
          />

          <div>
            <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
            {editingUser && (
              <EditUserModal
                user={editingUser}
                onSave={handleSaveEdit}
                onClose={() => setEditingUser(null)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
