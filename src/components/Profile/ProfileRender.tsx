import ArticleList from "../ArticleList/ArticleList";
import styles from "./Profile.module.css";
import Tab from "../common/Tab/Tab";
import React, { SyntheticEvent } from "react";
import Button from "../common/Button/Button";
import SettingsIcon from "../../icons/settings";
import MinusIcon from "../../icons/minus";
import PlusIcon from "../../icons/plus";
import { useAppDispatch, useAppSelector } from "../../services";
import { useHistory } from "react-router-dom";
import agent from "../../agent";
import { toggleFollowUser } from "../../services/articleListSlice";
import AvatarIcon from "../../icons/avatar";

interface IProfileRenderProps {
  favorite: boolean;
}

const ProfileRender: React.FC<IProfileRenderProps> = ({ favorite }) => {
  const { currentUser } = useAppSelector((state) => state.common);

  const { profile, pager, articles, articlesCount, currentPage } =
    useAppSelector((state) => state.articleList);

  const history = useHistory();

  const dispatch = useAppDispatch();

  if (!profile) {
    return null;
  }

  const isUser =
    currentUser !== null && profile.username === currentUser.username;

  const switchTab = (name: string) => {
    switch (name) {
      case "my": {
        history.push(`/@${profile.username}`);
        break;
      }
      case "favorites": {
        history.push(`/@${profile.username}/favorites`);
        break;
      }
    }
  };

  const editSettings = (e: SyntheticEvent) => {
    e.preventDefault();
    history.push("/settings");
  };

  const toggleFollow = (e: SyntheticEvent) => {
    e.preventDefault();
    const fetcher = profile.following
      ? agent.Profile.unfollow(profile.username)
      : agent.Profile.follow(profile.username);
    dispatch(toggleFollowUser({ fetcher }));
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.user_info}>
        <div className={styles.content}>
          {profile.image &&
          profile.image !==
            "https://static.productionready.io/images/smiley-cyrus.jpg" ? (
            <img
              src={profile.image}
              className="user-img"
              alt={profile.username}
              width="120px"
              height="120px"
            />
          ) : (
            <AvatarIcon width="120px" height="120px" />
          )}
          <span className={styles.username}>{profile.username}</span>
          <span className={styles.text}>{profile.bio}</span>

          <div className={styles.actions}>
            {isUser && (
              <Button disabled={false} onClick={editSettings}>
                <div className={styles.button_content}>
                  <SettingsIcon type="primary" width="14px" height="14px" />
                  <span className={styles.text}>Настройки профиля</span>
                </div>
              </Button>
            )}

            {!isUser && (
              <Button disabled={false} onClick={toggleFollow}>
                <div className={styles.button_content}>
                  {profile.following ? (
                    <>
                      <MinusIcon type="primary" />
                      <span className={styles.text}>Отписаться</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon type="primary" />
                      <span className={styles.text}>Подписаться</span>
                    </>
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.articles}>
            <div className={styles.feed}>
              <Tab value="my" active={!favorite} onClick={switchTab}>
                Мои статьи
              </Tab>
              <Tab value="favorites" active={favorite} onClick={switchTab}>
                Избранные статьи
              </Tab>
            </div>

            <ArticleList
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRender;
