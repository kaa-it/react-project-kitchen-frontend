import React, { FC, ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { TCurrentUser } from '.';
import { useAppSelector } from '../../services';
import { saveSettings } from '../../services/commonSlice';
import agent from '../../agent';
import { useDispatch } from 'react-redux';
import styles from './SettingsForm.module.css';
import Input from '../common/Input/Input';
import FileIcon from '../../icons/file';
import Button from '../common/Button/Button';
import Textarea from '../common/Textarea/Textarea';
import EyeIcon from '../../icons/eyeIcon';
import EyeCloseIcon from '../../icons/eyeCloseIcon';

const SettingsForm: FC = () => {
  const { currentUser, inProgress } = useAppSelector((state) => state.common);
  const dispatch = useDispatch();
  const [openPass, setOpenPass] = useState(false);
  const [state, setState] = useState<TCurrentUser>({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  const EyeClick = () => {
    setOpenPass(!openPass);
  };
  const updateState =
    (field: string) =>
    (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setState({ ...state, [field]: ev.target.value });

  useEffect(() => {
    if (currentUser) {
      setState({ ...state, ...currentUser });
    }
  }, [currentUser]);

  const submitForm = (ev: FormEvent) => {
    ev.preventDefault();

    const fetcher = agent.Auth.save(state);
    dispatch(saveSettings({ fetcher }));
  };

  return (
    <form onSubmit={submitForm}>
      <fieldset className={styles.formGroup}>
        <fieldset className={styles.formGroup + ' mt-10'}>
          <span className={styles.placeholder + ' pl-4'}>
            Изображение профиля
          </span>
          <Input
            type="URL"
            value={state.image}
            onChange={updateState('image')}
            icon={<FileIcon type="primary" />}
          />
        </fieldset>

        <fieldset className={styles.formGroup + ' mt-3'}>
          <span className={styles.placeholder + ' pl-4'}>Имя пользователя</span>
          <Input
            type="text"
            value={state.username}
            onChange={updateState('username')}
          />
        </fieldset>

        <fieldset className={styles.formGroup + ' mt-3'}>
          <span className={styles.placeholder + ' pl-4 mb-1'}>
            Информация о вас
          </span>
          <Textarea
            rows={8}
            value={state.bio}
            onChange={updateState('bio')}
            className={styles.bio}
            resize={'none'}
          />
        </fieldset>

        <fieldset className={styles.formGroup + ' mt-3'}>
          <span className={styles.placeholder + ' pl-4'}>E-mail</span>
          <Input
            type="email"
            value={state.email}
            onChange={updateState('email')}
          />
        </fieldset>

        <fieldset className={styles.formGroup + ' mt-3 mb-10'}>
          <span className={styles.placeholder + ' pl-4'}>Новый пароль</span>
          <Input
            type={openPass ? 'text' : 'password'}
            value={state.password}
            onChange={updateState('password')}
            icon={
              openPass ? (
                <EyeCloseIcon type="primary" onClick={EyeClick} />
              ) : (
                <EyeIcon type="primary" onClick={EyeClick} />
              )
            }
          />
        </fieldset>

        <Button type="submit" disabled={inProgress || false}>
          Сохранить
        </Button>
      </fieldset>
    </form>
  );
};

export default SettingsForm;
