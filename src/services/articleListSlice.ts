import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TArticle, TArticles, TTags } from "../types";
import { TThunkAPI } from "./index";

export type TPager = (
  page?: number
) => (url: string, data: any) => Promise<Array<TArticle>>;

interface IArticlesResult {
  articles: TArticles;
  articlesCount: number;
}

interface IArticleResult {
  article: TArticle;
}

type IOnHomeLoadAPIResult = [{ tags: TTags }, IArticlesResult];

interface IOnHomeLoadParams {
  tab: string;
  pager: TPager;
  fetcher: Promise<IOnHomeLoadAPIResult>;
}

interface IOnHomeLoadResult {
  tab: string;
  pager: TPager;
  data: IOnHomeLoadAPIResult;
}

export const onHomeLoad = createAsyncThunk<
  IOnHomeLoadResult,
  IOnHomeLoadParams,
  TThunkAPI
>("articleList/onHomeLoad", async (params, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return { tab: params.tab, pager: params.pager, data: res };
  } catch (err) {
    console.log("articleList/onHomeLoad", err);
    return thunkAPI.rejectWithValue("");
  }
});

export interface IApplyTagFilterParams {
  tag: string;
  pager: TPager;
  fetcher: Promise<IArticlesResult>;
}

interface IApplyTagFilterResult {
  tag: string;
  pager: TPager;
  data: IArticlesResult;
}

export const applyTagFilter = createAsyncThunk<
  IApplyTagFilterResult,
  IApplyTagFilterParams,
  TThunkAPI
>("articleList/applyTagFilter", async (params, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return { tag: params.tag, pager: params.pager, data: res };
  } catch (err) {
    console.log("articleList/applyTagFilter", err);
    return thunkAPI.rejectWithValue("");
  }
});

export interface IChangeTabParams {
  tab: string;
  pager: TPager;
  fetcher: Promise<IArticlesResult>;
}

interface IChangeTabResult {
  tab: string;
  pager: TPager;
  data: IArticlesResult;
}

export const changeTab = createAsyncThunk<
  IChangeTabResult,
  IChangeTabParams,
  TThunkAPI
>("articleList/changeTab", async (params, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return { tab: params.tab, pager: params.pager, data: res };
  } catch (err) {
    console.log("articleList/changeTab", err);
    return thunkAPI.rejectWithValue("");
  }
});

export interface IToggleFavoriteParams {
  fetcher: Promise<IArticleResult>;
}

export const toggleFavorite = createAsyncThunk<
  TArticle,
  IToggleFavoriteParams,
  TThunkAPI
>("articleList/toggleFavorite", async (params, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return res.article;
  } catch (err) {
    console.log("articleList/toggleFavorite", err);
    return thunkAPI.rejectWithValue("");
  }
});

export interface ISetPageParams {
  page: number;
  fetcher: Promise<IArticlesResult>;
}

interface ISetPageResult {
  page: number;
  data: IArticlesResult;
}

export const setPage = createAsyncThunk<
  ISetPageResult,
  ISetPageParams,
  TThunkAPI
>("articleList/setPage", async (params, thunkAPI) => {
  try {
    const res = await params.fetcher;
    return { page: params.page, data: res };
  } catch (err) {
    console.log("articleList/setPage", err);
    return thunkAPI.rejectWithValue("");
  }
});

type TArticleListSliceState = {
  tags: TTags | null;
  pager: TPager | null;
  articles: Array<TArticle> | null;
  articlesCount: number;
  tab: string | null;
  tag: string | null;
  currentPage: number;
};

const initialState: TArticleListSliceState = {
  tags: null,
  pager: null,
  articles: null,
  articlesCount: 0,
  tab: null,
  tag: null,
  currentPage: 0,
};

const articleListSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    onHomeUnload: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        onHomeLoad.fulfilled,
        (state, action: PayloadAction<IOnHomeLoadResult>) => {
          state.pager = action.payload.pager;
          state.tags = action.payload.data[0].tags;
          state.articles = action.payload.data[1].articles;
          state.articlesCount = action.payload.data[1].articlesCount;
          state.currentPage = 0;
          state.tab = action.payload.tab;
        }
      )
      .addCase(
        applyTagFilter.fulfilled,
        (state, action: PayloadAction<IApplyTagFilterResult>) => {
          state.pager = action.payload.pager;
          state.articles = action.payload.data.articles;
          state.articlesCount = action.payload.data.articlesCount;
          state.tab = null;
          state.tag = action.payload.tag;
          state.currentPage = 0;
        }
      )
      .addCase(
        changeTab.fulfilled,
        (state, action: PayloadAction<IChangeTabResult>) => {
          state.pager = action.payload.pager;
          state.articles = action.payload.data.articles;
          state.articlesCount = action.payload.data.articlesCount;
          state.tab = action.payload.tab;
          state.currentPage = 0;
          state.tag = null;
        }
      )
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<TArticle>) => {
          state.articles?.forEach((article) => {
            if (article.slug == action.payload.slug) {
              article.favorited = action.payload.favorited;
              article.favoritesCount = action.payload.favoritesCount;
            }
          });
        }
      )
      .addCase(
        setPage.fulfilled,
        (state, action: PayloadAction<ISetPageResult>) => {
          state.articles = action.payload.data.articles;
          state.articlesCount = action.payload.data.articlesCount;
          state.currentPage = action.payload.page;
        }
      );
  },
});

export const { onHomeUnload } = articleListSlice.actions;

export default articleListSlice.reducer;
