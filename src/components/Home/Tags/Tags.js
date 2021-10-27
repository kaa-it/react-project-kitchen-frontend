import React from "react";
import styles from "./Tags.module.css";
import PropTypes from "prop-types";
import TagList from "../../common/TagList/TagList";
import agent from "../../../agent";

const Tags = ({ tags, onClickTag }) => {
  const handleClickTag = (tag) => {
    onClickTag(
      tag,
      (page) => agent.Articles.byTag(tag, page),
      agent.Articles.byTag(tag)
    );
  };

  return (
    <div>
      {tags ? (
        <div className={styles.container}>
          {tags.length < 1 ? (
            <p className={styles.title}>Список тегов пуст</p>
          ) : (
            <>
              <p className={styles.title}>Популярные теги</p>
              <TagList tags={tags} onClickTag={handleClickTag} />
            </>
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <p className={styles.title}>Загрузка тегов...</p>
        </div>
      )}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  onClickTag: PropTypes.func.isRequired,
};

export default Tags;
