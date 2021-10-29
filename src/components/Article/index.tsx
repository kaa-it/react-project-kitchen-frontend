import ArticleMeta from "./ArticleMeta";
import CommentContainer from "./CommentContainer";
import React, { useEffect } from "react";
import agent from "../../agent";
import marked from "marked";
import { useAppDispatch, useAppSelector } from "../../services";
import { useParams } from "react-router";
import { onArticleLoad, onArticleUnload } from "../../services/articleSlice";

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

  const markup = {
    __html: marked(article.body, { sanitize: true }),
  };

  const canModify =
    currentUser !== null && currentUser.username === article.author.username;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup} />

            <ul className="tag-list">
              {article.tagList.map((tag: string) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions" />

        <div className="row">
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
