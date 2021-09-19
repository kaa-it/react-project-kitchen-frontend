import agent from "../../../agent";
import styles from "./MainView.module.css";
import React from "react";
import PropTypes from "prop-types";

const YourFeedTab = ({ tab, token, onTabClick }) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <a
        href=""
        className={tab === "feed" ? styles.tab_type_current : styles.tab}
        onClick={clickHandler}
      >
        Ваша лента
      </a>
    );
  }
  return null;
};

YourFeedTab.propTypes = {
  tab: PropTypes.string,
  token: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
};

export default YourFeedTab;
