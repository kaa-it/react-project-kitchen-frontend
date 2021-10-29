import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
import React from "react";
import { TComment, TUser } from "../../types";

interface ICommentProps {
  comment: TComment;
  slug: string;
  currentUser: TUser | null;
}

const Comment: React.FC<ICommentProps> = ({ comment, slug, currentUser }) => {
  const show =
    currentUser !== null && currentUser.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
