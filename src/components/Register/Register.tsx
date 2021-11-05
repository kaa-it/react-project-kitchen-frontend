import {Link} from "react-router-dom";
import ListErrors from "../ListErrors";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import agent from "../../agent";
import EyeIcon from "../../icons/eyeIcon";
import Input from "../common/Input/Input";
import registerStyle from "./Register.module.css";
import Button from "../common/Button/Button";
import {useAppDispatch, useAppSelector} from "../../services";
import {unloadAuthPage, register} from "../../services/commonSlice";
import {useInput} from "../../hooks/useInput";

const Register: React.FC = () => {
  const [visiblePass, setVisiblePass] = React.useState<boolean>(true);
  const userNameInput = useInput('', {empty: true, min: 2, max: 32, validName: true});
  const emailInput = useInput('', {empty: true, min: 5, email: true});
  const passwordInput = useInput('', {empty: true, min: 6, max: 18});
  const {errors, inProgress} = useAppSelector((state) => state.common);
  const [validForm, setValidForm] = useState<boolean>(false);

  useEffect(() => {
    if (userNameInput.isValid && passwordInput.isValid && emailInput.isValid || inProgress) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [userNameInput.isValid, passwordInput.isValid, emailInput.isValid, inProgress])

  const dispatch = useAppDispatch();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setValue({ ...form, [e.target.name]: e.target.value });
  // };

  const handleToggleShowPassword = () => {
    setVisiblePass(!visiblePass);
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const fetcher = agent.Auth.register(
      userNameInput.value,
      emailInput.value,
      passwordInput.value
    );
    dispatch(register({fetcher}));
  }


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

            <ListErrors errors={errors}/>

            <form onSubmit={handleSubmitForm}>
              <fieldset>
                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>Имя пользователя</p>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Имя пользователя"
                    onChange={userNameInput.onChange}
                    onBlur={userNameInput.onBlur}
                    value={userNameInput.value}
                  />
                  {userNameInput.dirty && <span style={{color: "red"}}>{userNameInput.inputValidation.inputError}</span>}
                </fieldset>

                <fieldset className="form-group mb-3">
                  <p className={registerStyle.input__title}>E-mail</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Почтовый адрес"
                    onChange={emailInput.onChange}
                    onBlur={emailInput.onBlur}
                    value={emailInput.value}
                  />
                  {emailInput.dirty && <span style={{color: "red"}}>{emailInput.inputValidation.inputError}</span>}

                </fieldset>

                <fieldset className="form-group mb-10">
                  <p className={`${registerStyle.input__title} pl-4`}>Пароль</p>
                  <div className={registerStyle.input__item}>
                    <Input
                      name="password"
                      type={`${visiblePass ? "password" : "text"}`}
                      placeholder="Пароль"
                      onChange={passwordInput.onChange}
                      onBlur={passwordInput.onBlur}
                      icon={
                        <EyeIcon
                          type={`${!visiblePass ? "primary" : "secondary"}`}
                        />
                      }
                      onIconClick={handleToggleShowPassword}
                      value={passwordInput.value}
                    />
                    {passwordInput.dirty && <span style={{color: "red"}}>{passwordInput.inputValidation.inputError}</span>}
                  </div>
                </fieldset>
                <Button
                  type="submit"
                  disabled={!validForm}
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
