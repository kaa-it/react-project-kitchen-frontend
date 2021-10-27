import PropTypes from "prop-types";

export type TUser = {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
};

export type TProfile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type TArticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tagList: TTags;
  favorited: boolean;
  favoritesCount: number;
  author: TProfile;
};

export type TFeedResult = {
  articles: Array<TArticle>;
  articlesCount: number;
};

export type TTags = Array<string>;

const userPropTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
});

const errorPropTypes = PropTypes.shape({
  username: PropTypes.string,
  email: PropTypes.string,
  message: PropTypes.string,
});

export { userPropTypes, errorPropTypes };
