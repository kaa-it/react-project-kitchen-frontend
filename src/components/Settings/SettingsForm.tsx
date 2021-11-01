import React, { FC, ChangeEvent, useEffect, useState, FormEvent } from "react";
import { TCurrentUser } from ".";
import { useAppSelector } from "../../services";
import { saveSettings } from "../../services/commonSlice";
import agent from "../../agent";
import { useDispatch } from "react-redux";

const SettingsForm: FC = () => {
  const { currentUser, inProgress } = useAppSelector((state) => state.common);
  const dispatch = useDispatch();

  const [state, setState] = useState<TCurrentUser>({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

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
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL иззображения профиля"
            value={state.image}
            onChange={updateState("image")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={updateState("username")}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Информация о вас"
            value={state.bio}
            onChange={updateState("bio")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={updateState("email")}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Новый пароль"
            value={state.password}
            onChange={updateState("password")}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={inProgress || false}
        >
          Сохранить
        </button>
      </fieldset>
    </form>
  );
};

export default SettingsForm;
