import ListErrors from "./ListErrors";
import React, { ChangeEvent, FormEvent, useEffect } from "react";
import agent from "../agent";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../services";
import {
  addTag,
  loadEditorPage,
  removeTag,
  unloadEditorPage,
  updateField,
} from "../services/editorSlice";
import { TArticleInput } from "../types";
import { submitArticle } from "../services/commonSlice";

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

  const handleRemoveTag = (tag: string) => () => {
    dispatch(removeTag({ tag }));
  };

  const onChange = (e: ChangeEvent<{ name: string; value: string }>) => {
    dispatch(updateField({ key: e.target.name, value: e.target.value }));
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

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={errors} />

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    value={title}
                    onChange={onChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="What's this article about?"
                    value={description}
                    onChange={onChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={onChange}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="tagInput"
                    placeholder="Enter tags"
                    value={tagInput}
                    onChange={onChange}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {(tagList || []).map((tag) => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={handleRemoveTag(tag)}
                          />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={inProgress ? inProgress : undefined}
                  onClick={handleSubmitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
