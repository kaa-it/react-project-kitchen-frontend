import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import { TArticle } from '../../types';
import ArticleInfo from './ArticleInfo';

interface IArticleMetaProps {
  article: TArticle;
  canModify: boolean;
}

const ArticleMeta: React.FC<IArticleMetaProps> = ({ article, canModify }) => {
  return (
    <div className="article-meta">
      <ArticleInfo
        currentUser={article.author}
        articleDate={article.createdAt}
      />

      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
