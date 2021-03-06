import ListErrors from "../ListErrors";
import styles from "./editor.module.css";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import agent from "../../agent";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  loadEditorPage,
  unloadEditorPage,
  updateField,
} from "../../services/editorSlice";
import { TArticleInput } from "../../types";
import { submitArticle } from "../../services/commonSlice";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import Textarea from "../common/Textarea/Textarea";

interface IEditorParams {
  slug?: string;
}

const Editor: React.FC = () => {
  const { slug } = useParams<IEditorParams>();

  const { inProgress, errors } = useAppSelector((state) => state.common);

  const { articleSlug, title, body, description, tagList } = useAppSelector(
    (state) => state.editor
  );
  const [tagInput, setTagInput] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTagInput(tagList.join(","));
  }, [tagList]);

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
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const tagArr = tagInput.split(",");
    const article: TArticleInput = {
      title,
      description,
      body,
      tagList: tagArr,
    };

    const fetcher = articleSlug
      ? agent.Articles.update(Object.assign(article, { slug: articleSlug }))
      : agent.Articles.create(article);

    dispatch(submitArticle({ fetcher }));
  };

  const captionEditor = slug ? "?????????????????????????? ????????????" : "?????????? ????????????";

  return (
    <div className={styles.editor}>
      <span className={styles.h2}>{captionEditor}</span>
      <ListErrors errors={errors} />

      <form onSubmit={handleSubmitForm} className={styles.form}>
        <label className={styles.label}>
          <span className={styles.labelTitle}>??????????????????</span>
          <Input
            type="text"
            name="title"
            placeholder="???????????????? ????????????"
            value={title}
            onChange={onChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>????????????????</span>
          <Input
            type="text"
            name="description"
            placeholder="?? ?????? ????????????"
            value={description}
            onChange={onChange}
          />
        </label>
        {/*<label className={styles.label}>*/}
        {/*  <span className={styles.labelTitle}>??????????????????????</span>*/}
        {/*  <Input*/}
        {/*    type="text"*/}
        {/*    name="image"*/}
        {/*    placeholder="?????????????????????? (??????????????????????)"*/}
        {/*    value=""*/}
        {/*    onChange={onChange}*/}
        {/*    disabled={true}*/}
        {/*    icon={<FileIcon type="secondary" />}*/}
        {/*  />*/}
        {/*</label>*/}
        <label className={styles.label}>
          <span className={styles.labelTitle}>????????????????????</span>
          <Textarea
            name="body"
            placeholder="?????????? ????????????"
            value={body}
            onChange={onChange}
            rows={8}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.labelTitle}>????????</span>
          <Input
            name="tagInput"
            placeholder="???????? ?????????? ??????????????"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        </label>
        <span className={styles.buttonSubmit}>
          <Button type="submit" disabled={inProgress ? inProgress : undefined}>
            <span className={styles.buttonText}>????????????????????????</span>
          </Button>
        </span>
      </form>
    </div>
  );
};

export default Editor;
