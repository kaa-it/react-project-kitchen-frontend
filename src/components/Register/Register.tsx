import { Link } from "react-router-dom";
import ListErrors from "../ListErrors";
import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../../agent";
import EyeIcon from "../../icons/eyeIcon";
import Input from "../common/Input/Input";
import registerStyle from "./Register.module.css";
import Button from "../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../services";
import { unloadAuthPage, register } from "../../services/commonSlice";

type TRegistrationInfo = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [visiblePass, setVisiblePass] = React.useState(true);
  const [form, setValue] = useState<TRegistrationInfo>({
    username: "",
    email: "",
    password: "",
  });

  const { errors, inProgress } = useAppSelector((state) => state.common);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleShowPassword = () => {
    setVisiblePass(!visiblePass);
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const fetcher = agent.Auth.register(
      form.username,
      form.email,
      form.password
    );
    dispatch(register({ fetcher }));
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
            <h1 className="text-xs-center mb-10">Зарегистрироваться</h1>
            <p className="text-xs-center">
              <Link className={registerStyle.link} to="/login">
                Уже есть аккаунт?
              </Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={handleSubmitForm}>
              <fieldset>
                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>Имя пользователя</p>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Имя пользователя"
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>E-mail</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Почтовый адрес"
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="form-group mb-10">
                  <p className={`${registerStyle.input__title} pl-4`}>Пароль</p>
                  <div className={registerStyle.input__item}>
                    <Input
                      name="password"
                      type={`${visiblePass ? "password" : "text"}`}
                      placeholder="Пароль"
                      onChange={handleChange}
                      icon={
                        <EyeIcon
                          type={`${!visiblePass ? "primary" : "secondary"}`}
                        />
                      }
                      onIconClick={handleToggleShowPassword}
                    />
                  </div>
                </fieldset>
                <Button
                  type="submit"
                  disabled={inProgress ? inProgress : undefined}
                >
                  Зарегистрироваться
                </Button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
