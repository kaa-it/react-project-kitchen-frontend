import React from 'react';
import agent from '../../../agent';
import styles from "./Tags.module.css";
import PropTypes from 'prop-types';

const Tags = props => {

  const tags = props.tags;
  // const tags = ['Tag', 'Test', 'YOLO', 'WTF', 'GM', 'TGIF', 'ASAP', 'DIY']

  return (
    <div>
      {tags ?
      <div className={styles.container}>
        {tags.length < 1 ?
          <p className={styles.title}>Список тегов пуст</p>
        :
          <>
            <p className={styles.title}>Популярные теги</p>
            <div className={styles.tags}>
              {
                tags.map(tag => {
                  const handleClick = ev => {
                  ev.preventDefault();
                  props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
                };
                  return (
                    <a
                      href=""
                      className={styles.tag}
                      key={tag}
                      onClick={handleClick}
                    >
                      {tag}
                    </a>
                  );
                })
              }
            </div>
          </>
        }
      </div>
      :
      <div className={styles.container}>
        <p className={styles.title}>Загрузка тегов...</p>
      </div>
      }
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  onClickTag: PropTypes.func
};

export default Tags;
