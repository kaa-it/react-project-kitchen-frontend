import styles from "./Tab.module.css";
import React, {useCallback} from "react";
import PropTypes from "prop-types";

const Tab = ({ value, active, onClick, children }) => {
  const clickHandler = useCallback((ev) => {
    ev.preventDefault();
    onClick(value);
  }, [onClick, value]);

  return (
    <a
      href=""
      className={active ? styles.tab_type_current : styles.tab}
      onClick={clickHandler}
    >
      {children}
    </a>
  );
};

Tab.propTypes = {
  value: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Tab;
