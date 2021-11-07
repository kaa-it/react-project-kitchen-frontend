import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { TArticle } from '../../types';
import {
  IToggleFavoriteParams,
  toggleFavorite,
} from '../../services/articleListSlice';
import { useAppDispatch } from '../../services';
import ArticleInfo from '../Article/ArticleInfo/ArticleInfo';
import styles from './ArticlePreview.module.css';
import TagList from '../common/TagList/TagList';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

interface IArticlePreviewProps {
  article: TArticle;
  tag: string | null;
}

const ArticlePreview: React.FC<IArticlePreviewProps> = ({ article, tag }) => {
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
    <div className={styles.articlePreview + ' pt-8 pb-8'}>
      <div className={`${styles.articleMeta} mb-4`}>
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

      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.text}>{article.description}</p>
      <div className={styles.footer}>
        <Link to={`/article/${article.slug}`} className={styles.more}>
          <span>Read more...</span>
        </Link>
        <TagList tags={article.tagList} onClickTag={undefined} tagActiv={tag} />
      </div>
    </div>
  );
};

export default ArticlePreview;
