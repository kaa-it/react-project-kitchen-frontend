import React from "react";
import agent from "../../agent";
import LikeIcon from "../../icons/like";
import { useAppDispatch } from "../../services";
import {dislikeComment, likeComment } from "../../services/articleSlice";
import styles from './index.module.css';

interface ILikeButtonProps {
  likes: number;
  isLiked: boolean;
  commentId: string;
}

const LikeButton: React.FC<ILikeButtonProps> = ({
  likes,
  isLiked,
  commentId,
}) => {
  const dispatch = useAppDispatch();

  const handleLike = () => {
    console.log('liked pressed')
    const fetcher = isLiked ? agent.Comments.dislike(commentId) : agent.Comments.like(commentId);
    dispatch(isLiked ? dislikeComment({ fetcher }) : likeComment({ fetcher }));
  };

  return (
    <div className={styles.like} onClick={handleLike}>
      <span className={`text ${styles.likes} ${isLiked ? styles.liked : ''}`}>{likes}</span>
      <LikeIcon liked={isLiked} />
    </div>
  );
};

export default LikeButton;
