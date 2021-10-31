import React, { ChangeEvent, FormEvent, useState } from "react";
import agent from "../../agent";
import { TUser } from "../../types";
import { useAppDispatch } from "../../services";
import { addComment } from "../../services/articleSlice";
import styles from "./CommentInput.module.css";
import Button from "../common/Button/Button";
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
    <form className={styles.commentForm} onSubmit={createComment}>
      <div className={styles.cardBlock}>
        <textarea
          className={styles.formControl + " ml-6 mt-6 mr-6"}
          placeholder="Написать комментарий..."
          value={body}
          onChange={changeBody}
          rows={4}
        />
      </div>
      <div className={styles.cardFooter} >
      <div className={styles.cardFooterContent + " ml-6 mb-6 mr-6 mt-6"}>
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username}
        />
        <Button type="submit">
          Отправить комментарий
        </Button>
      </div>
      </div>
    </form>
  );
};

export default CommentInput;
