import Banner from "./Banner/Banner";
import MainView from "./MainView/MainView";
import Tags from "./Tags/Tags";
import React, { useEffect } from "react";
import agent from "../../agent";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  applyTagFilter,
  IApplyTagFilterParams,
  onHomeLoad,
  clearArticleListSlice,
} from "../../services/articleListSlice";

const Promise = global.Promise;

const Home: React.FC = () => {
  const { appName, token } = useAppSelector((state) => state.common);
  const { tags } = useAppSelector((state) => state.articleList);

  const dispatch = useAppDispatch();

  const onClickTag = (params: IApplyTagFilterParams) => {
    dispatch(applyTagFilter(params));
  };

  useEffect(() => {
    const tab = token ? "feed" : "all";
    const pager = token ? agent.Articles.feed : agent.Articles.all;
    const fetcher = Promise.all([agent.Tags.getAll(), pager()]);

    dispatch(onHomeLoad({ tab, pager, fetcher }));

    return () => {
      dispatch(clearArticleListSlice());
    };
  }, []);

  return (
    <div className="home-page">
      <Banner appName={appName} />
      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <Tags tags={tags} onClickTag={onClickTag} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
