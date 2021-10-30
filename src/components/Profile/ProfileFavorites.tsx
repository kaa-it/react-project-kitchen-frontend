import React, { useEffect } from "react";
import ProfileRender from "./ProfileRender";
import { useParams } from "react-router";
import {
  clearArticleListSlice,
  loadProfilePage,
} from "../../services/articleListSlice";
import { useAppDispatch } from "../../services";
import agent from "../../agent";

type TProfileFavoritesParams = {
  username: string;
};

const ProfileFavorites: React.FC = () => {
  const { username } = useParams<TProfileFavoritesParams>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const pager = (page?: number) => agent.Articles.favoritedBy(username, page);
    const fetcher = Promise.all([
      agent.Profile.get(username),
      agent.Articles.favoritedBy(username),
    ]);
    dispatch(loadProfilePage({ pager, fetcher }));
    return () => {
      dispatch(clearArticleListSlice());
    };
  }, [username]);

  return <ProfileRender favorite />;
};

export default ProfileFavorites;
