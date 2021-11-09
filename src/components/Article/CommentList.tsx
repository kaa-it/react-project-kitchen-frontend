import Comment from './Comment/Comment';
import React from 'react';
import { TComments, TUser } from '../../types';

interface ICommentListProps {
  comments: TComments;
  slug: string;
  currentUser: TUser | null;
}

const CommentList: React.FC<ICommentListProps> = ({
  comments,
  slug,
  currentUser,
}) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            comment={comment}
            currentUser={currentUser}
            slug={slug}
            key={comment.id}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
