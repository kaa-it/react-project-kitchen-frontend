import ListErrors from "../ListErrors";
import styles from "./editor.module.css";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import agent from "../../agent";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  addTag,
  loadEditorPage,
  unloadEditorPage,
  updateField,
} from "../../services/editorSlice";
import { TArticleInput } from "../../types";
import { submitArticle } from "../../services/commonSlice";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import Textarea from "../common/Textarea/Textarea";
import FileIcon from "../../icons/file";
interface IEditorParams {
  slug?: string;
}

const Editor: React.FC = () => {
  const { slug } = useParams<IEditorParams>();

  const { inProgress, errors } = useAppSelector((state) => state.common);

  const { articleSlug, title, body, description, tagInput, tagList } =
    useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(unloadEditorPage());
      const fetcher = agent.Articles.get(slug);
      dispatch(loadEditorPage({ fetcher }));
      return;
    }
    dispatch(loadEditorPage({ fetcher: null }));

    return () => {
      dispatch(unloadEditorPage());
    };
  }, [slug]);

  const onChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    dispatch(updateField({ key: e.target.name, value: e.target.value }));
    console.log(e.target.value)
  };

  const watchForEnter = (ev: React.KeyboardEvent) => {
    if (ev.code == "Enter") {
      ev.preventDefault();
      dispatch(addTag());
    }
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const article: TArticleInput = {
      title,
      description,
      body,
      tagList,
    };
    const fetcher = articleSlug
      ? agent.Articles.update(Object.assign(article, { slug: articleSlug }))
      : agent.Articles.create(article);

    dispatch(submitArticle({ fetcher }));
  };

  const captionEditor = slug ? "Редактировать запись" : "Новая запись";

  return (
    <div className={styles.editor}>
      <h2 className={styles.h2}>{captionEditor}</h2>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmitForm} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Заголовок</span>
          <Input
            type="text"
            name="title"
            placeholder="Название статьи"
            value={title}
            onChange={onChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Описание</span>
          <Input
            type="text"
            name="image"
            placeholder="О чем статья"
            value={description}
            onChange={onChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Изображение</span>
          <Input
            type="text"
            name="image"
            placeholder="Изображение (опционально)"
            value=""
            onChange={onChange}
            disabled={true}
            icon={<FileIcon type="secondary" />}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Содержание</span>
          <Textarea
            name="body"
            placeholder="Текст статьи"
            value={body}
            onChange={onChange}
            rows={8}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>Теги</span>
          <Input
            name="tag"
            placeholder="Теги через запятую"
            value={tagList}
            onChange={onChange}
          />
        </label>
        <span className={styles.buttonSubmit}>
          <Button type="submit" disabled={inProgress ? inProgress : undefined}>
            <span className={styles.buttonText}>Опубликовать</span>
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Editor;
