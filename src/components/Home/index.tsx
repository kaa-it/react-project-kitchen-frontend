import Banner from "./Banner/Banner";
import MainView from "./MainView/MainView";
import React, { useEffect } from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";
import { useAppSelector } from "../../services";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

const Home: React.FC = () => {
  const { appName, token } = useAppSelector((state) => state.common);

  useEffect(() => {}, []);
};

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? "feed" : "all";
    const articlesPromise = this.props.token
      ? agent.Articles.feed
      : agent.Articles.all;

    this.props.onLoad(
      tab,
      articlesPromise,
      Promise.all([agent.Tags.getAll(), articlesPromise()])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
