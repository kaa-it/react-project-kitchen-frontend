import React from "react";
import styles from "./TagList.module.css";
import { TTags } from "../../../types";

interface ITagListProps {
  tags: TTags;
  onClickTag: ((tag: string) => void) | undefined;
}

const TagList: React.FC<ITagListProps> = ({ tags, onClickTag }) => {
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
        }
        return (
          <a
            href=""
            className={styles.tag}
            key={tag}
            {...(onClickTag ? { onClick } : {})}
          >
            {tag}
          </a>
        );
      })}
    </div>
  );
};

export default TagList;
