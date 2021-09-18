import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import HomeIcon from "../../icons/home";
import NewIcon from "../../icons/new";
import SettingsIcon from "../../icons/settings";
import AvatarIcon from "../../icons/avatar";
import React from "react";
import { userPropTypes } from "../../types";

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <ul className={styles.nav}>
        <li>
          <Link to="/" className={styles.nav_link}>
            <HomeIcon type="primary" />
            <span>Главная</span>
          </Link>
        </li>

        <li>
          <Link to="/editor" className={styles.nav_link}>
            <NewIcon type="primary" />
            <span>Новая запись</span>
          </Link>
        </li>

        <li>
          <Link to="/settings" className={styles.nav_link}>
            <SettingsIcon type="primary" />
            <span>Настройки</span>
          </Link>
        </li>

        <li>
          <Link to={`/@${currentUser.username}`} className={styles.nav_link}>
            <AvatarIcon />
            <span>{currentUser.username}</span>
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

LoggedInView.propTypes = {
  currentUser: userPropTypes,
};

export default LoggedInView;
