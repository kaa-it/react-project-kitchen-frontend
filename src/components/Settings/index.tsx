import React, { FC, useEffect } from "react";
import ListErrors from "../ListErrors";
import { TUser } from "../../types";
import SettingsForm from "./SettingsForm";
import { useAppDispatch, useAppSelector } from "../../services";
import { unloadSettingsPage } from "../../services/commonSlice";
import { logout } from "../../services/commonSlice";

export type TCurrentUser = Omit<TUser, "token"> & { password: string };

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
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Ваши настройки</h1>

            <ListErrors errors={errors} />

            <SettingsForm />
            <hr />

            <button className="btn btn-outline-danger" onClick={onClickLogout}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
