import React, { useEffect } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import ProfileRender from "./ProfileRender";

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

const Profile = (props) => {
  console.log(props);
  useEffect(() => {
    props.onLoad(
      Promise.all([
        agent.Profile.get(props.match.params.username),
        agent.Articles.byAuthor(props.match.params.username),
      ])
    );
    return () => props.onUnload;
  }, [props.match.params.username]);

  return <ProfileRender {...props} favorite={false} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
//export { Profile/*, mapStateToProps*/ };
