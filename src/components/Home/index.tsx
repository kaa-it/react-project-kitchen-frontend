import Banner from "./Banner/Banner";
import MainView from "./MainView/MainView";
import Tags from "./Tags/Tags";
import React, { useEffect } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  applyTagFilter,
  IApplyTagFilterParams,
  onHomeLoad,
  onHomeUnload,
} from "../../services/articleListSlice";

const Promise = global.Promise;

// const Promise = global.Promise;
//
// const mapStateToProps = (state) => ({
//   ...state.home,
//   appName: state.common.appName,
//   token: state.common.token,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   onClickTag: (tag, pager, payload) =>
//     dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
//   onLoad: (tab, pager, payload) =>
//     dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
//   onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
//});

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
      dispatch(onHomeUnload());
    };
  });

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

// class Home extends React.Component {
//   componentWillMount() {
//     const tab = this.props.token ? "feed" : "all";
//     const articlesPromise = this.props.token
//       ? agent.Articles.feed
//       : agent.Articles.all;
//
//     this.props.onLoad(
//       tab,
//       articlesPromise,
//       Promise.all([agent.Tags.getAll(), articlesPromise()])
//     );
//   }
//
//   componentWillUnmount() {
//     this.props.onUnload();
//   }
//
//   render() {
//     return (
//       <div className="home-page">
//         <Banner appName={appName} />
//         <div className="container page">
//           <div className="row">
//             <MainView />
//
//             <div className="col-md-3">
//               <Tags tags={tags} onClickTag={this.props.onClickTag} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
