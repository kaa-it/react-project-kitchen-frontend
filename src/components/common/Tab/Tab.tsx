import styles from "./Tab.module.css";
import React, { SyntheticEvent, useCallback } from "react";

interface ITabProps {
  value: string;
  active: boolean;
  onClick: (value: string) => void;
}

const Tab: React.FC<ITabProps> = ({ value, active, onClick, children }) => {
  const clickHandler = useCallback(
    (ev: SyntheticEvent) => {
      ev.preventDefault();
      onClick(value);
    },
    [onClick, value]
  );

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

export default Tab;
