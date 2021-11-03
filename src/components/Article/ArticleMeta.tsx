import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import { TArticle } from '../../types';
import ArticleInfo from './ArticleInfo/ArticleInfo';
import styles from './ArticleMeta.module.css';

interface IArticleMetaProps {
  article: TArticle;
  canModify: boolean;
}

const ArticleMeta: React.FC<IArticleMetaProps> = ({ article, canModify }) => {
  return (
    <div className={styles.articleMeta + ' mt-8 mb-8'}>
      <ArticleInfo
        currentUser={article.author}
        articleDate={article.createdAt}
      />
      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
