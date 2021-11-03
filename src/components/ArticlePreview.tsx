import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { TArticle } from '../types';
import {
  IToggleFavoriteParams,
  toggleFavorite,
} from '../services/articleListSlice';
import { useAppDispatch } from '../services';
import ArticleInfo from './Article/ArticleInfo/ArticleInfo';
import styles from './ArticlePreview.module.css';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

interface IArticlePreviewProps {
  article: TArticle;
}

const ArticlePreview: React.FC<IArticlePreviewProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const favoriteButtonClass = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  const changeFavorite = (params: IToggleFavoriteParams) => {
    dispatch(toggleFavorite(params));
  };

  const handleClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (article.favorited) {
      changeFavorite({ fetcher: agent.Articles.unfavorite(article.slug) });
    } else {
      changeFavorite({ fetcher: agent.Articles.favorite(article.slug) });
    }
  };

  return (
    <div className="article-preview">
      <div className={styles.articleMeta}>
        <ArticleInfo
          currentUser={article.author}
          articleDate={article.createdAt}
        />

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
