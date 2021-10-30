import { Link } from "react-router-dom";
import ListErrors from "./ListErrors";
import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../agent";
import { useAppDispatch, useAppSelector } from "../services";
import { login, unloadAuthPage } from "../services/commonSlice";

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
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Вход</h1>
            <p className="text-xs-center">
              <Link to="/register">Нужен аккаунт?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={handleSubmitForm}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                  />
                </fieldset>

                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={inProgress ? inProgress : undefined}
                >
                  Войти
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
