import ArticleList from "../ArticleList";
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import Tab from "../common/Tab/Tab";
import React from "react";

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"/> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"/>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const ProfileRender = (props) => {
  const profile = props.profile;
  if (!profile) {
    return null;
  }

  const isUser = props.currentUser &&
    props.profile.username === props.currentUser.username;

  const switchTab = (name) => {
    switch (name) {
      case "my": {
        props.history.push(`/@${props.profile.username}`);
        break;
      }
      case "favorites": {
        props.history.push(`/@${props.profile.username}/favorites`);
        break;
      }
    }
  };

  return (
    <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">

              <img src={profile.image} className="user-img" alt={profile.username} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={props.onFollow}
                unfollow={props.onUnfollow}
                />

            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">

            <div className={styles.feed}>
              <Tab value="my" active={!props.favorite} onClick={switchTab}>Мои статьи</Tab>
              <Tab value="favorites" active={props.favorite} onClick={switchTab}>Избранные статьи</Tab>
            </div>

            <ArticleList
              pager={props.pager}
              articles={props.articles}
              articlesCount={props.articlesCount}
              state={props.currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileRender;
