import React from 'react';
import styles from "./Tags.module.css";
import PropTypes from 'prop-types';
import TagList from '../../common/TagList/TagList'

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
              <TagList                   
                tags={ tags}
                onClickTag={props.onClickTag}
              />
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
  onClickTag: PropTypes.func.isRequired
};

export default Tags;
