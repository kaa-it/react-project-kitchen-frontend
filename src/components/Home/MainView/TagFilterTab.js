import styles from "./MainView.module.css";
import React from "react";
import PropTypes from "prop-types";

const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return (
    <a href="" className={styles.tab_type_current}>
      #{tag}
    </a>
  );
};

TagFilterTab.propTypes = {
  tag: PropTypes.string,
};

export default TagFilterTab;
