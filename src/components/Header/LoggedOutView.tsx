import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import HomeIcon from "../../icons/home";
import LoginIcon from "../../icons/login";
import React from "react";
import { TUser } from "../../types";

interface ILoggedOutViewProps {
  currentUser: TUser | null;
}

const LoggedOutView: React.FC<ILoggedOutViewProps> = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <ul className={styles.nav}>
        <li>
          <Link to="/" className={styles.nav_link}>
            <HomeIcon type="primary" />
            <span>Главная</span>
          </Link>
        </li>

        <li>
          <Link to="/login" className={styles.nav_link}>
            <LoginIcon type="primary" />
            <span>Войти</span>
          </Link>
        </li>

        <li>
          <Link to="/register" className={styles.nav_link}>
            <LoginIcon type="primary" />
            <span>Регистрация</span>
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

export default LoggedOutView;
