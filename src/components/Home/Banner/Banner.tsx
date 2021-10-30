import React from "react";
import styles from "./Banner.module.css";
import { useAppSelector } from "../../../services";

const Banner: React.FC = () => {
  const { appName } = useAppSelector((state) => state.common);

  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>{appName.toLowerCase()}</h1>
      <p className={styles.subtitle}>Главное, чтобы ты был Космическим!</p>
    </div>
  );
};

export default Banner;
