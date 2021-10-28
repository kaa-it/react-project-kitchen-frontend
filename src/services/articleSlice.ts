import { TArticle, TComments } from "../types";
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

interface IArticleSliceState {
  article: TArticle | null;
  comments: TComments | null;
}

const initialState: IArticleSliceState = {
  article: null,
  comments: null,
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
    builder.addCase(
      onArticleLoad.fulfilled,
      (state, action: PayloadAction<TOnArticleLoadResult>) => {
        state.article = action.payload[0].article;
        state.comments = action.payload[1].comments;
      }
    );
  },
});

export const { onArticleUnload } = articleSlice.actions;

export default articleSlice.reducer;
