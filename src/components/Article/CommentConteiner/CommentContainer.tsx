import CommentInput from '../CommentInput/CommentInput';
import CommentList from '../CommentList';
import { Link } from 'react-router-dom';
import React from 'react';
import { TErrors, TComments, TUser } from '../../../types';
import ListErrors from '../../ListErrors';
import styles from './CommentContainer.module.css';

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
      <div className={styles.comments}>
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
      <div className={styles.comments}>
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
