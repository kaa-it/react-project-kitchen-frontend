import React from "react";
import { Link } from "react-router-dom";
import { TProfile, TUser } from "../../../types";
import styles from "./ArticleInfo.module.css";
import AvatarIcon from "../../../icons/avatar";

interface IArticleInfoProps {
  currentUser: TProfile | TUser;
  articleDate: Date;
}

const dateToText = (currentDate: Date): string => {
  let result = new Date(currentDate).toLocaleString("ru", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  result = result.charAt(0).toUpperCase() + result.slice(1, -3);
  return result;
};

const ArticleInfo: React.FC<IArticleInfoProps> = ({
  currentUser,
  articleDate,
}) => {
  return (
    <div className={styles.info}>
      <Link to={`/@${currentUser.username}`}>
        <div className={styles.logo + " mr-2"}>
          {currentUser.image &&
          currentUser.image !==
            "https://static.productionready.io/images/smiley-cyrus.jpg" ? (
            <img
              src={currentUser.image}
              alt="Logo"
              className={styles.logo + " mr-2"}
            />
          ) : (
            <AvatarIcon width="100%" height="100%" />
          )}
        </div>
      </Link>
      <div className={styles.text}>
        <Link to={`/@${currentUser.username}`} className={styles.author}>
          {currentUser.username}
        </Link>
        <span className={styles.date}>{dateToText(articleDate)}</span>
      </div>
    </div>
  );
};

export default ArticleInfo;
