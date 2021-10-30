import { Link } from "react-router-dom";
import ListErrors from "../ListErrors";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import styles from "./Login.module.css";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from "../../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className={styles.login}>
        <h2 className={styles.h2}>Войти</h2>
        <Link to="/register" className={styles.link}>
          Хотите создать аккаунт?
        </Link>

        <ListErrors errors={this.props.errors} />

        <form
          onSubmit={this.submitForm(email, password)}
          className={styles.form}
        >
          <label className={styles.label}>E-mail</label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.changeEmail}
          />
          <label className={styles.label}>Пароль</label>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={this.changePassword}
          />
          <span className={styles.buttonSubmit}>
            <Button type="submit" disabled={this.props.inProgress}>
              Войти
            </Button>
          </span>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
