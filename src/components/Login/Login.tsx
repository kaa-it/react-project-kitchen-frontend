import { Link } from "react-router-dom";
import ListErrors from "../ListErrors";
import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../../agent";
import { useAppDispatch, useAppSelector } from "../../services";
import { login, unloadAuthPage } from "../../services/commonSlice";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import styles from "./Login.module.css";
import EyeIcon from "../../icons/eyeIcon";
import EyeCloseIcon from "../../icons/eyeCloseIcon";
type TCredentials = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form, setValue] = useState<TCredentials>({ email: "", password: "" });

  const { errors, inProgress } = useAppSelector((state) => state.common);

  const [visiblePass, setVisiblePass] = React.useState<boolean>(true);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const fetcher = agent.Auth.login(form.email, form.password);
    dispatch(login({ fetcher }));
  };

  const handleToggleShowPassword = () => {
    setVisiblePass(!visiblePass);
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
          <span className={styles.labelTitle}>E-mail</span>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Пароль</span>
          <Input
            type={`${visiblePass ? "password" : "text"}`}
            placeholder="Пароль"
            name="password"
            value={form.password}
            onChange={handleChange}
            icon={
              !visiblePass ? (
                  <EyeCloseIcon type="primary" onClick={handleToggleShowPassword} />
              ) : (
                  <EyeIcon type="primary" onClick={handleToggleShowPassword} />
              )
            }
          />
        </label>
        <span className={styles.buttonSubmit}>
          <Button type="submit" disabled={inProgress ? inProgress : undefined}>
            <span className={styles.buttonText}>Войти</span>
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Login;
