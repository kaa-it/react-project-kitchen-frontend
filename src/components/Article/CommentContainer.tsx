import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";
import React from "react";
import { TErrors, TComments, TUser } from "../../types";
import ListErrors from "../ListErrors";

interface ICommentContainerProps {
  comments: TComments;
  errors: TErrors | null;
  slug: string;
  currentUser: TUser | null;
}

const CommentContainer: React.FC<ICommentContainerProps> = ({
  comments,
  errors,
  slug,
  currentUser,
}) => {
  if (currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={errors} />
          <CommentInput slug={slug} currentUser={currentUser} />
        </div>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser}
        />
      </div>
    );
  }
};

export default CommentContainer;
