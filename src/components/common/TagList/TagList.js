import React from 'react';
import agent from '../../../agent';
import styles from "./TagList.module.css";
import PropTypes from 'prop-types';

const TagList = props => {

  const tags = props.tags;

  return (
    <div className={styles.tags}>
      {
        tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault();
            props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          }
          return (
            <a
              href=""
              className={styles.tag}
              key={tag}
              onClick={props.onClickTag && handleClick}
            >
              {tag}
            </a>
          );
        })
      }
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.array,
  onClickTag: PropTypes.func
};

export default TagList;
