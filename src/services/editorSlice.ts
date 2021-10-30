import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TArticle, TArticleResult } from "../types";
import { TThunkAPI } from "./index";

interface ILoadEditorPageParams {
  fetcher: Promise<TArticleResult> | null;
}

type TLoadEditorPageResult = TArticle | null;

export const loadEditorPage = createAsyncThunk<
  TLoadEditorPageResult,
  ILoadEditorPageParams,
  TThunkAPI
>("editor/loadEditorPage", async (params, thunkAPI) => {
  try {
    if (params.fetcher) {
      const res = await params.fetcher;
      return res.article;
    }
    return null;
  } catch (err) {
    console.log("editor/loadEditorPage", err);
    return thunkAPI.rejectWithValue("");
  }
});

type TEditorSliceState = {
  articleSlug: string;
  title: string;
  description: string;
  body: string;
  tagInput: string;
  tagList: Array<string>;
};

const initialState: TEditorSliceState = {
  articleSlug: "",
  title: "",
  description: "",
  body: "",
  tagInput: "",
  tagList: [],
};

interface IUpdateFieldParams {
  key: string;
  value: string;
}

interface IRemoveTagParams {
  tag: string;
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    unloadEditorPage: (state) => {
      Object.assign(state, initialState);
    },
    updateField: (state, action: PayloadAction<IUpdateFieldParams>) => {
      Object.assign(state, { [action.payload.key]: action.payload.value });
    },
    addTag: (state) => {
      state.tagList.push(state.tagInput);
      state.tagInput = "";
    },
    removeTag: (state, action: PayloadAction<IRemoveTagParams>) => {
      state.tagList = state.tagList.filter((tag) => tag !== action.payload.tag);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEditorPage.fulfilled, (state, action) => {
      state.articleSlug = action.payload ? action.payload.slug : "";
      state.title = action.payload ? action.payload.title : "";
      state.description = action.payload ? action.payload.description : "";
      state.body = action.payload ? action.payload.body : "";
      state.tagInput = "";
      state.tagList = action.payload ? action.payload.tagList : [];
    });
  },
});

export const { unloadEditorPage, updateField, addTag, removeTag } =
  editorSlice.actions;

export default editorSlice.reducer;
