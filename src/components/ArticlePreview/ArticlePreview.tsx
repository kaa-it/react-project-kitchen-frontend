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
import LikeIcon from "../../icons/like";
const FAVORITED_CLASS = styles.active;
const NOT_FAVORITED_CLASS = styles.inactive;

interface IArticlePreviewProps {
  article: TArticle;
  tag: string | null;
}

const ArticlePreview: React.FC<IArticlePreviewProps> = ({ article, tag }) => {
  const dispatch = useAppDispatch();

  const favoriteButtonIcon = article.favorited
    ? <LikeIcon liked={true} />
    : <LikeIcon liked={false} />;
  const favoriteButtonClassName = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS

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
          <button className={`${styles.like} ${favoriteButtonClassName}`} onClick={handleClick}>
            <span>{article.favoritesCount}</span> {favoriteButtonIcon}
          </button>
        </div>
      </div>

      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.text}>{article.description}</p>
      <div className={styles.footer}>
        <Link to={`/article/${article.slug}`} className={styles.more}>
          <span>Читать...</span>
        </Link>
        <TagList tags={article.tagList} onClickTag={undefined} tagActiv={tag} />
      </div>
    </div>
  );
};

export default ArticlePreview;
