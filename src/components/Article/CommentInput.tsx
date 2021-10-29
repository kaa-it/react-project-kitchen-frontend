import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../../agent";
import { TUser } from "../../types";
import { useAppDispatch } from "../../services";
import { addComment } from "../../services/articleSlice";

interface ICommentInputProps {
  slug: string;
  currentUser: TUser;
}

const CommentInput: React.FC<ICommentInputProps> = ({ slug, currentUser }) => {
  const dispatch = useAppDispatch();

  const [body, setBody] = useState("");

  const changeBody = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(ev.target.value);
  };

  const createComment = (ev: FormEvent) => {
    ev.preventDefault();

    const fetcher = agent.Comments.create(slug, { body });

    setBody("");

    dispatch(addComment({ fetcher }));
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Напишите комментарий..."
          value={body}
          onChange={changeBody}
          rows={3}
        />
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Добавить комментарий
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
