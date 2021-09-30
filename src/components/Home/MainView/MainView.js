import ArticleList from "../../ArticleList";
import React from "react";
import { connect } from "react-redux";
import { CHANGE_TAB } from "../../../constants/actionTypes";
import agent from "../../../agent";
import styles from "./MainView.module.css";
import Tab from "../../common/Tab/Tab";

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = (props) => {
  const switchTab = (name) => {
    switch (name) {
      case "all": {
        props.onTabClick("all", agent.Articles.all, agent.Articles.all());
        break;
      }
      case "feed": {
        props.onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
        break;
      }
    }
  }

  return (
    <div className="col-md-9">
      <div className={styles.feed}>
        {props.token && (
          <Tab
            value="feed"
            active={props.tab === "feed"}
            onClick={switchTab}
          >Ваша лента</Tab>
        )}

        <Tab value="all" active={props.tab === "all"} onClick={switchTab}>Лента</Tab>

        {props.tag && <Tab value="tag" active onClick={switchTab}>#{props.tag}</Tab>}
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
