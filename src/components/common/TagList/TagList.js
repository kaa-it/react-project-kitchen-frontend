import React from "react";
import styles from "./TagList.module.css";
import PropTypes from "prop-types";

const TagList = ({ tags, onClickTag }) => {
  let props = {};
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        if (onClickTag) {
          props.onClick = (ev) => {
            ev.preventDefault();
            onClickTag(tag);
          };
        }
        return (
          <a href="" className={styles.tag} key={tag} {...props}>
            {tag}
          </a>
        );
      })}
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.array,
  onClickTag: PropTypes.func,
};

export default TagList;
