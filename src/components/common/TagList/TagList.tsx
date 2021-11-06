import React from 'react';
import styles from './TagList.module.css';
import { TTags } from '../../../types';

interface ITagListProps {
  tags: TTags;
  onClickTag: ((tag: string) => void) | undefined;
  tagActiv?: string | null;
}

const TagList: React.FC<ITagListProps> = ({ tags, onClickTag, tagActiv }) => {
  let onClick: ((ev: React.MouseEvent<HTMLAnchorElement>) => void) | undefined =
    undefined;

  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        if (onClickTag) {
          onClick = (ev) => {
            ev.preventDefault();
            onClickTag(tag);
          };
          return (
            <a
              href=""
              className={styles.tag + ' pt-1 pr-2 pb-1 pl-2'}
              key={tag}
              onClick={onClick}
            >
              {tag}
            </a>
          );
        } else {
          return (
            <span
              className={
                (tagActiv === tag ? styles.tagActiv : styles.tagPassive) +
                ' pt-1 pr-2 pb-1 pl-2'
              }
              key={tag}
            >
              {tag}
            </span>
          );
        }
      })}
    </div>
  );
};

export default TagList;
