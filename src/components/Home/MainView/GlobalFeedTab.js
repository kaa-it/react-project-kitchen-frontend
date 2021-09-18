import agent from "../../../agent";
import styles from "./MainView.module.css";
import React from "react";
import PropTypes from "prop-types";

const GlobalFeedTab = ({ tab, onTabClick }) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick("all", agent.Articles.all, agent.Articles.all());
  };
  return (
    <a
      href=""
      className={tab === "all" ? styles.tab_type_current : styles.tab}
      onClick={clickHandler}
    >
      Лента
    </a>
  );
};

GlobalFeedTab.propTypes = {
  tab: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
};

export default GlobalFeedTab;
