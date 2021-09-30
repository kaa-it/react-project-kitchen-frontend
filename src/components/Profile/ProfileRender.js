import ArticleList from "../ArticleList";
import styles from './Profile.module.css';
import Tab from "../common/Tab/Tab";
import React, {useCallback} from "react";
import Button from "../common/Button/Button";
import SettingsIcon from "../../icons/settings";
import MinusIcon from "../../icons/minus";
import PlusIcon from "../../icons/plus";

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

  const editSettings = (e) => {
    e.preventDefault();
    props.history.push("/settings");
  };

  const toggleFollow = useCallback((e) => {
    e.preventDefault();
    if (profile.following) {
      props.onUnfollow(profile.username)
    } else {
      props.onFollow(profile.username)
    }
  }, [props.profile.following]);

  return (
    <div className="profile-page">

      <div className={styles.user_info}>
        <div className={styles.content}>

              <img src={profile.image} className="user-img" alt={profile.username} width="120px" height="120px"/>
              <span className={styles.username}>{profile.username}</span>
              <span className={styles.text}>{profile.bio}</span>

              <div className={styles.actions}>
                {isUser && (
                    <Button disabled={false} onClick={editSettings}>
                      <div className={styles.button_content}>
                        <SettingsIcon type="primary" width="14px" height="14px"/>
                        <span className={styles.text}>Настройки профиля</span>
                      </div>
                    </Button>
                )}

                {!isUser && (
                    <Button disabled={false} onClick={toggleFollow}>
                      <div className={styles.button_content}>
                        {profile.following ? (
                            <>
                              <MinusIcon type="primary"/>
                              <span className={styles.text}>Отписаться</span>
                            </>
                        ):(
                            <>
                            <PlusIcon type="primary"/>
                          <span className={styles.text}>Подписаться</span>
                            </>
                        )}

                      </div>
                    </Button>
                )}
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
