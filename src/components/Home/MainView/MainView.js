import ArticleList from "../../ArticleList";
import React from "react";
import { connect } from "react-redux";
import { CHANGE_TAB } from "../../../constants/actionTypes";
import styles from "./MainView.module.css";
import YourFeedTab from "./YourFeedTab";
import GlobalFeedTab from "./GlobalFeedTab";
import TagFilterTab from "./TagFilterTab";

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
  return (
    <div className="col-md-9">
      <div className={styles.feed}>
        <YourFeedTab
          token={props.token}
          tab={props.tab}
          onTabClick={props.onTabClick}
        />

        <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

        <TagFilterTab tag={props.tag} />
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
