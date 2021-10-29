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

export type TArticles = Array<TArticle>;

export type TTags = Array<string>;

export type TComment = {
  id: string;
  body: string;
  createdAt: Date;
  author: TProfile;
};

export type TComments = Array<TComment>;

export type TErrors = {
  [key: string]: string | object;
};

const userPropTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
});

export { userPropTypes };
