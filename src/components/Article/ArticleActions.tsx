import { Link } from "react-router-dom";
import React from "react";
import agent from "../../agent";
import { TArticle } from "../../types";
import { useAppDispatch } from "../../services";
import { deleteArticle } from "../../services/commonSlice";

interface IArticleActionsProps {
  article: TArticle;
  canModify: boolean;
}

const ArticleActions: React.FC<IArticleActionsProps> = ({
  canModify,
  article,
}) => {
  const dispatch = useAppDispatch();

  const del = () => {
    dispatch(deleteArticle({ fetcher: agent.Articles.del(article.slug) }));
  };

  if (canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  }

  return <span />;
};

export default ArticleActions;
