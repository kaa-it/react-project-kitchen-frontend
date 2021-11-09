import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination';
import React from 'react';
import { TArticle } from '../../types';
import { TPager } from '../../services/articleListSlice';
import styles from './ArticleList.module.css';

interface IArticleListProps {
  pager: TPager | null;
  articles: Array<TArticle> | null;
  articlesCount: number;
  currentPage: number;
  tag?: string | null;
}

const ArticleList: React.FC<IArticleListProps> = ({
  pager,
  articles,
  articlesCount,
  currentPage,
  tag = null,
}) => {
  if (!articles) {
    return <div className={styles.articlePreview + ' mt-8'}>Загрузка...</div>;
  }

  if (articles.length === 0) {
    return (
      <div className={styles.articlePreview + ' mt-8'}>
        Здесь пусто... пока что.
      </div>
    );
  }

  return (
    <div>
      {articles.map((article) => {
        return (
          <ArticlePreview article={article} key={article.slug} tag={tag} />
        );
      })}

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticleList;
