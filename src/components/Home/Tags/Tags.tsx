import React from 'react';
import styles from './Tags.module.css';
import TagList from '../../common/TagList/TagList';
import agent from '../../../agent';
import { IApplyTagFilterParams } from '../../../services/articleListSlice';
import { TTags } from '../../../types';

interface ITagsProps {
  tags: TTags | null;
  onClickTag: (params: IApplyTagFilterParams) => void;
}

const Tags: React.FC<ITagsProps> = ({ tags, onClickTag }) => {
  const handleClickTag = (tag: string) => {
    const params: IApplyTagFilterParams = {
      tag,
      pager: (page) => agent.Articles.byTag(tag, page),
      fetcher: agent.Articles.byTag(tag),
    };

    onClickTag(params);
  };

  return (
    <div>
      {tags ? (
        <div className={styles.container}>
          {tags.length < 1 ? (
            <p className={styles.title}>Список тегов пуст</p>
          ) : (
            <>
              <p className={styles.title + ' mb-4'}>Популярные теги</p>
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

// Tags.propTypes = {
//   tags: PropTypes.array,
//   onClickTag: PropTypes.func.isRequired,
// };

export default Tags;
