import { TArticle, TErrors, TComments, TComment } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TThunkAPI } from "./index";

type TOnArticleLoadResult = [{ article: TArticle }, { comments: TComments }];

export interface IOnArticleLoadParams {
  fetcher: Promise<TOnArticleLoadResult>;
}

export const onArticleLoad = createAsyncThunk<
  TOnArticleLoadResult,
  IOnArticleLoadParams,
  TThunkAPI
>("article/onArticleLoad", async (params, thunkAPI) => {
  try {
    return await params.fetcher;
  } catch (err) {
    console.log("article/onArticleLoad", err);
    return thunkAPI.rejectWithValue("");
  }
});

export type TAddCommentAPIResult = {
  comment: TComment;
};

interface IAddCommentParams {
  fetcher: Promise<TAddCommentAPIResult>;
}

type TAddCommentThunkAPI = TThunkAPI & { rejectValue: TErrors };

export const addComment = createAsyncThunk<
  TComment,
  IAddCommentParams,
  TAddCommentThunkAPI
>("article/addComment", async (params: IAddCommentParams, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return res.comment;
  } catch (err) {
    console.log("article/addComment", err);
    // @ts-ignore
    return thunkAPI.rejectWithValue(err.response.body.errors);
  }
});

export interface IDeleteCommentParams {
  commentId: string;
  fetcher: Promise<{}>;
}

type TDeleteCommentResult = {
  commentId: string;
};

export const deleteComment = createAsyncThunk<
  TDeleteCommentResult,
  IDeleteCommentParams,
  TThunkAPI
>("article/deleteComment", async (params, thunkAPI) => {
  try {
    await params.fetcher;
    return { commentId: params.commentId };
  } catch (err) {
    console.log("article/deleteComment", err);
    return thunkAPI.rejectWithValue("");
  }
});

interface IArticleSliceState {
  article: TArticle | null;
  comments: TComments | null;
  commentErrors: TErrors | null;
}

const initialState: IArticleSliceState = {
  article: null,
  comments: null,
  commentErrors: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    onArticleUnload: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        onArticleLoad.fulfilled,
        (state, action: PayloadAction<TOnArticleLoadResult>) => {
          state.article = action.payload[0].article;
          state.comments = action.payload[1].comments;
        }
      )
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<TComment>) => {
          let comments: TComments = [];

          if (state.comments != null) {
            comments.concat(state.comments);
          }

          state.comments = comments.concat(action.payload);
        }
      )
      .addCase(addComment.rejected, (state, action) => {
        state.comments = null;
        state.commentErrors = action.payload ? action.payload : null;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<TDeleteCommentResult>) => {
          if (state.comments !== null) {
            state.comments = state.comments.filter(
              (comment) => comment.id !== action.payload.commentId
            );
          }
        }
      );
  },
});

export const { onArticleUnload } = articleSlice.actions;

export default articleSlice.reducer;
