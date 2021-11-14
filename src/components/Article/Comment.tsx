import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
import React from "react";
import { TComment, TUser } from "../../types";
import ArticleInfo from "./ArticleInfo/ArticleInfo";
import styles from "./Comment.module.css";
import agent from "../../agent";
import { useDispatch } from "react-redux";
import { dislikeComment, likeComment } from "../../services/articleSlice";
import LikeButton from "./LikeButton";

interface ICommentProps {
  comment: TComment;
  slug: string;
  currentUser: TUser | null;
}

const Comment: React.FC<ICommentProps> = ({ comment, slug, currentUser }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    const fetcher = agent.Comments.dislike(comment.id);
    dispatch(likeComment({ fetcher }));
  };

  const show =
    currentUser !== null && currentUser.username === comment.author.username;
  return (
    <div className={styles.card + " mt-6"}>
      <div className={styles.cardBlock}>
        <p className={styles.cardText + " mr-6 mt-6 ml-6"}>{comment.body}</p>
      </div>
      <div className={styles.cardFooter + " pl-6 pb-6 pr-6"}>
        <ArticleInfo
          currentUser={comment.author}
          articleDate={comment.createdAt}
        />
        {!show && (
          <LikeButton
            likes={comment.likesCount}
            isLiked={comment.isLiked}
            commentId={comment.id}
          />
        )}
        <DeleteButton show={show} slug={slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
