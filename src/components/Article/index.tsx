import ArticleMeta from "./ArticleMeta/ArticleMeta";
import CommentContainer from "./CommentConteiner/CommentContainer";
import React, { useEffect } from "react";
import agent from "../../agent";
import { useAppDispatch, useAppSelector } from "../../services";
import { useParams } from "react-router";
import { onArticleLoad, onArticleUnload } from "../../services/articleSlice";
import styles from "./index.module.css";
import TagList from "../common/TagList/TagList";
import ReactMarkdown from "react-markdown";

interface IArticleParams {
  id: string;
}

const Article: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.common);

  const { article, comments, commentErrors } = useAppSelector(
    (state) => state.article
  );

  const { id } = useParams<IArticleParams>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetcher = Promise.all([
      agent.Articles.get(id),
      agent.Comments.forArticle(id),
    ]);
    dispatch(onArticleLoad({ fetcher }));
    return () => {
      dispatch(onArticleUnload());
    };
  }, []);

  if (!article) {
    return null;
  }

  const canModify =
    currentUser !== null && currentUser.username === article.author.username;

  return (
    <div className={styles.articlePage}>
      <div className={styles.banner}>
        <div className={styles.container}>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>

      <div className={styles.article}>
        <h1 className={styles.title + " mt-4 mb-4"}>{article.title}</h1>
        <div className={styles.row}>
          <ReactMarkdown
            children={article.body}
            className={styles.articleText}
          />
          <TagList tags={article.tagList} onClickTag={undefined} />
        </div>
        <div className="article-actions" />

        <div className={styles.rowComments}>
          <p className={styles.commentTitle + " mt-8 mb-8"}>Комментарии</p>
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
