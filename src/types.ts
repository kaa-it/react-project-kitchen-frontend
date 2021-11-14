import React from "react";

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

export type TProfileResult = { profile: TProfile };

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

export type TArticleResult = {
  article: TArticle;
};

export type TArticleInput = Omit<
  TArticle,
  "favorited" | "favoritesCount" | "author" | "slug" | "createdAt" | "updatedAt"
> & { slug?: string };

export type TArticles = Array<TArticle>;

export type TTags = Array<string>;

export type TComment = {
  id: string;
  body: string;
  createdAt: Date;
  author: TProfile;
  likesCount: number;
  isLiked: boolean;
};

export type TComments = Array<TComment>;

export type TErrors = {
  [key: string]: string | object;
};

export type TIconWithTypeProps = {
  type: "primary" | "secondary" | "warning";
} & React.SVGAttributes<SVGElement>;
