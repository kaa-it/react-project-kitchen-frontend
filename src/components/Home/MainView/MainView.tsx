import ArticleList from '../../ArticleList';
import React from 'react';
import agent from '../../../agent';
import styles from './MainView.module.css';
import Tab from '../../common/Tab/Tab';
import {
  changeTab,
  IChangeTabParams,
} from '../../../services/articleListSlice';
import { useAppDispatch, useAppSelector } from '../../../services';

const MainView: React.FC = () => {
  const { tab, tag, pager, articles, articlesCount, currentPage } =
    useAppSelector((state) => state.articleList);

  const { token } = useAppSelector((state) => state.common);

  const dispatch = useAppDispatch();

  const onTabClick = (params: IChangeTabParams) => {
    dispatch(changeTab(params));
  };

  const switchTab = (name: string) => {
    switch (name) {
      case 'all': {
        onTabClick({
          tab: 'all',
          pager: agent.Articles.all,
          fetcher: agent.Articles.all(),
        });
        break;
      }
      case 'feed': {
        onTabClick({
          tab: 'feed',
          pager: agent.Articles.feed,
          fetcher: agent.Articles.feed(),
        });
        break;
      }
    }
  };

  return (
    <div className="col-md-9">
      <div className={styles.feed}>
        {token && (
          <Tab value="feed" active={tab === 'feed'} onClick={switchTab}>
            Ваша лента
          </Tab>
        )}

        <Tab value="all" active={tab === 'all'} onClick={switchTab}>
          Лента
        </Tab>

        {tag && (
          <Tab value="tag" active onClick={switchTab}>
            #{tag}
          </Tab>
        )}
      </div>

      <ArticleList
        pager={pager}
        articles={articles}
        articlesCount={articlesCount}
        currentPage={currentPage}
        tag={tag}
      />
    </div>
  );
};

export default MainView;
