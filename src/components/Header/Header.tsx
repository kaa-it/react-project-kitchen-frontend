import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import LoggedOutView from "./LoggedOutView";
import LoggedInView from "./LoggedInView";
import { TUser } from "../../types";

interface IHeaderProps {
  currentUser: TUser | null;
  appName: string;
}

const Header: React.FC<IHeaderProps> = ({ currentUser, appName }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_content}>
        <Link to="/" className={styles.navbar_brand}>
          {appName.toLowerCase()}
        </Link>

        <LoggedOutView currentUser={currentUser} />

        <LoggedInView currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Header;
