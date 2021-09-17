import React from "react";
import PropTypes from "prop-types";
import styles from "./Banner.module.css";

const Banner = ({ appName }) => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>{appName.toLowerCase()}</h1>
      <p className={styles.subtitle}>Главное, чтобы ты был Космическим!</p>
    </div>
  );
};

Banner.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default Banner;
