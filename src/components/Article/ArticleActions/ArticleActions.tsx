import { Link } from "react-router-dom";
import React from "react";
import agent from "../../../agent";
import { TArticle } from "../../../types";
import { useAppDispatch } from "../../../services";
import { deleteArticle } from "../../../services/commonSlice";
import Button from "../../common/Button/Button";
import TrashIcon from "../../../icons/trash";
import NewIcon from "../../../icons/new";
import styles from './ArticleActions.module.css';

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
      <span className={styles.buttons}>
        <Link
          to={`/editor/${article.slug}`}
        >
          <Button>
            <NewIcon type="primary" />
            <p className={styles.text}>Редактировать запись</p>
            </Button>
        </Link>
        <button className={`${styles.delete} ml-4`} onClick={del}>
          <TrashIcon  type="alert" />
          <p className={styles.text}>Удалить запись</p>
          </button>
      </span>
    );
  }

  return <span />;
};

export default ArticleActions;
