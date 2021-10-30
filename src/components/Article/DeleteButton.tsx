import React from "react";
import agent from "../../agent";
import { useAppDispatch } from "../../services";
import { deleteComment } from "../../services/articleSlice";

interface IDeleteButtonProps {
  show: boolean;
  slug: string;
  commentId: string;
}

const DeleteButton: React.FC<IDeleteButtonProps> = ({
  show,
  slug,
  commentId,
}) => {
  const dispatch = useAppDispatch();

  const del = () => {
    const fetcher = agent.Comments.delete(slug, commentId);
    dispatch(deleteComment({ commentId, fetcher }));
  };

  if (show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} />
      </span>
    );
  }
  return null;
};

export default DeleteButton;
