import React, { useEffect } from "react";
import agent from "../../agent";
import ProfileRender from "./ProfileRender";
import { useParams } from "react-router";
import { useAppDispatch } from "../../services";
import {
  clearArticleListSlice,
  loadProfilePage,
} from "../../services/articleListSlice";

type TProfileParams = {
  username: string;
};

const Profile: React.FC = () => {
  const { username } = useParams<TProfileParams>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetcher = Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username),
    ]);
    dispatch(loadProfilePage({ pager: null, fetcher }));
    return () => {
      dispatch(clearArticleListSlice());
    };
  }, [username]);

  return <ProfileRender favorite={false} />;
};

export default Profile;
