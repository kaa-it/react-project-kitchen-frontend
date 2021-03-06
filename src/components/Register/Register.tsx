import { Link } from "react-router-dom";
import ListErrors from "../ListErrors";
import React, { FormEvent, useEffect, useState } from "react";
import agent from "../../agent";
import EyeIcon from "../../icons/eyeIcon";
import Input from "../common/Input/Input";
import styles from "./Register.module.css";
import Button from "../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../services";
import { unloadAuthPage, register } from "../../services/commonSlice";
import { useInput } from "../../hooks/useInput";
import WarningIcon from "../../icons/warning";
import EyeCloseIcon from "../../icons/eyeCloseIcon";

const Register: React.FC = () => {
  const [visiblePass, setVisiblePass] = React.useState<boolean>(true);
  const userNameInput = useInput("", {
    empty: true,
    min: 2,
    max: 32,
    validName: true,
  });
  const emailInput = useInput("", { empty: true, min: 5, email: true });
  const passwordInput = useInput("", { empty: true, min: 6, max: 18 });
  const { errors, inProgress } = useAppSelector((state) => state.common);
  const [validForm, setValidForm] = useState<boolean>(false);

  useEffect(() => {
    if (
      (userNameInput.isValid && passwordInput.isValid && emailInput.isValid) ||
      inProgress
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [
    userNameInput.isValid,
    passwordInput.isValid,
    emailInput.isValid,
    inProgress,
  ]);

  const dispatch = useAppDispatch();

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
    dispatch(register({ fetcher }));
  };

  React.useEffect(() => {
    return () => {
      dispatch(unloadAuthPage());
    };
  }, []);

  let icon: JSX.Element = (
    <EyeCloseIcon type="primary" onClick={handleToggleShowPassword} />
  );

  if (!passwordInput.isValid && passwordInput.dirty) {
    icon = <WarningIcon type={"warning"} />;
  } else if (visiblePass) {
    icon = <EyeIcon type="primary" onClick={handleToggleShowPassword} />;
  }

  return (
    <div className={styles.register}>
      <h2 className={styles.h2}>????????????????????????????????????</h2>

      <Link className={styles.link} to="/login">
        ?????? ???????? ???????????????
      </Link>

      <ListErrors errors={errors} />

      <form onSubmit={handleSubmitForm} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelTitle}>?????? ????????????????????????</span>
          <Input
            name="username"
            type="text"
            placeholder="?????? ????????????????????????"
            onChange={userNameInput.onChange}
            onBlur={userNameInput.onBlur}
            value={userNameInput.value}
            icon={
              !userNameInput.isValid && userNameInput.dirty ? (
                <WarningIcon type={"warning"} />
              ) : undefined
            }
            error={!userNameInput.isValid && userNameInput.dirty}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelTitle}>E-mail</span>
          <Input
            name="email"
            type="email"
            placeholder="???????????????? ??????????"
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            value={emailInput.value}
            icon={
              !emailInput.isValid && emailInput.dirty ? (
                <WarningIcon type={"warning"} />
              ) : undefined
            }
            error={!emailInput.isValid && emailInput.dirty}
          />
          {emailInput.dirty && !emailInput.isValid && (
            <span className={styles.error}>
              {emailInput.inputValidation.inputError}
            </span>
          )}
        </label>

        <label className={styles.label}>
          <span className={styles.labelTitle}>????????????</span>
          <Input
            name="password"
            type={`${visiblePass ? "password" : "text"}`}
            placeholder="????????????"
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            icon={icon}
            error={!passwordInput.isValid && passwordInput.dirty}
            onIconClick={handleToggleShowPassword}
            value={passwordInput.value}
          />
          {passwordInput.dirty && !passwordInput.isValid && (
            <span className={styles.error}>
              {passwordInput.inputValidation.inputError}
            </span>
          )}
        </label>
        <span className={styles.buttonSubmit}>
          <Button type="submit" disabled={!validForm}>
            ????????????????????????????????????
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Register;
