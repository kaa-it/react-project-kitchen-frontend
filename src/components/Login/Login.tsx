import { Link } from "react-router-dom";
import ListErrors from "../ListErrors";
import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../../agent";
import { useAppDispatch, useAppSelector } from "../../services";
import { login, unloadAuthPage } from "../../services/commonSlice";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import styles from "./Login.module.css";

type TCredentials = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form, setValue] = useState<TCredentials>({ email: "", password: "" });

  const { errors, inProgress } = useAppSelector((state) => state.common);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const fetcher = agent.Auth.login(form.email, form.password);
    dispatch(login({ fetcher }));
  };

  React.useEffect(() => {
    return () => {
      dispatch(unloadAuthPage());
    };
  }, []);

  return (
    <div className={styles.login}>
      <h2 className={styles.h2}>Войти</h2>
      <Link to="/register" className={styles.link}>
        Хотите создать аккаунт?
      </Link>

      <ListErrors errors={errors} />

      <form onSubmit={handleSubmitForm} className={styles.form}>
        <label className={styles.label}>
          E-mail
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Пароль
          <Input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <span className={styles.buttonSubmit}>
          <Button type="submit" disabled={inProgress ? inProgress : undefined}>
            Войти
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Login;
