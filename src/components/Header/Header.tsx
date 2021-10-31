import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import LoggedOutView from "./LoggedOutView";
import LoggedInView from "./LoggedInView";
import { useAppSelector } from "../../services";

const Header: React.FC = () => {
  const { appName } = useAppSelector((state) => state.common);
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_content}>
        <Link to="/" className={styles.navbar_brand}>
          {appName.toLowerCase()}
        </Link>

        <LoggedOutView />

        <LoggedInView />
      </div>
    </div>
  );
};

export default Header;
