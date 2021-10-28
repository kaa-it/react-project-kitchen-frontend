import ArticlePreview from "./ArticlePreview";
import ListPagination from "./ListPagination";
import React from "react";
import { TArticle } from "../types";
import { TPager } from "../services/articleListSlice";

interface IArticleListProps {
  pager: TPager | null;
  articles: Array<TArticle> | null;
  articlesCount: number;
  currentPage: number;
}

const ArticleList: React.FC<IArticleListProps> = ({
  pager,
  articles,
  articlesCount,
  currentPage,
}) => {
  if (!articles) {
    return <div className="article-preview">Загрузка...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">Пока здесь нет статей...</div>;
  }

  return (
    <div>
      {articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />;
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
