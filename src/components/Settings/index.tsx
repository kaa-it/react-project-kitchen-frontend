import React, { FC, useEffect } from 'react';
import ListErrors from '../ListErrors';
import { TUser } from '../../types';
import SettingsForm from './SettingsForm';
import { useAppDispatch, useAppSelector } from '../../services';
import { unloadSettingsPage } from '../../services/commonSlice';
import { logout } from '../../services/commonSlice';
import styles from './index.module.css';

export type TCurrentUser = Omit<TUser, 'token'> & { password: string };

const Settings: FC = () => {
  const { errors } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(unloadSettingsPage());
    };
  }, []);

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="mt-10">
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h1 className={styles.title}>Ваши настройки</h1>

            <ListErrors errors={errors} />

            <SettingsForm />
            <hr className={styles.line + ' mt-10'} />

            <button className={styles.exit + ' mt-10'} onClick={onClickLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
