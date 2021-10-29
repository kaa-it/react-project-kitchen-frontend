import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TErrors, TUser } from "../types";
import { TThunkAPI } from "./index";
import agent from "../agent";

interface TUserResult {
  user: TUser;
}

interface IAppLoadParams {
  fetcher: Promise<TUserResult> | null;
  token: string | null;
}

interface IAppLoadResult {
  user: TUser | null;
  token: string | null;
}

export const appLoad = createAsyncThunk<
  IAppLoadResult,
  IAppLoadParams,
  TThunkAPI
>("common/appLoad", async (params, thunkAPI) => {
  try {
    let res: TUserResult | null = null;
    if (params.fetcher) {
      res = await params.fetcher;
    }

    return { token: params.token, user: res ? res.user : null };
  } catch (err) {
    console.log("common/appLoad", err);
    return thunkAPI.rejectWithValue("");
  }
});

export interface IDeleteArticleParams {
  fetcher: Promise<{}>;
}

export const deleteArticle = createAsyncThunk<
  void,
  IDeleteArticleParams,
  TThunkAPI
>("common/deleteArticle", async (params, thunkAPI) => {
  try {
    await params.fetcher;
  } catch (err) {
    console.log("common/deleteArticle", err);
    return thunkAPI.rejectWithValue("");
  }
});

interface IAuthParams {
  fetcher: Promise<TUserResult>;
}

type TAuthThunkAPI = TThunkAPI & { rejectValue: TErrors };

export const register = createAsyncThunk<
  TUserResult,
  IAuthParams,
  TAuthThunkAPI
>("common/register", async (params: IAuthParams, thunkAPI) => {
  try {
    return await params.fetcher;
  } catch (err) {
    console.log("common/register", err);
    // @ts-ignore
    return thunkAPI.rejectWithValue(err.response.body.errors);
  }
});

export const login = createAsyncThunk<TUserResult, IAuthParams, TAuthThunkAPI>(
  "common/login",
  async (params, thunkAPI) => {
    try {
      return await params.fetcher;
    } catch (err) {
      console.log("common/login", err);
      // @ts-ignore
      return thunkAPI.rejectWithValue(err.response.body.errors);
    }
  }
);

type TCommonSliceState = {
  appLoaded: boolean;
  token: string | null;
  currentUser: TUser | null;
  redirectTo: string | null;
  appName: "Научная фантастика";
  inProgress: boolean | null;
  errors: TErrors | null;
};

const initialState: TCommonSliceState = {
  appLoaded: false,
  token: localStorage.getItem("jwt"),
  currentUser: null,
  redirectTo: null,
  appName: "Научная фантастика",
  inProgress: null,
  errors: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    unloadAuthPage: (state) => {
      state.inProgress = null;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        appLoad.fulfilled,
        (state, action: PayloadAction<IAppLoadResult>) => {
          state.token = action.payload.token;
          state.appLoaded = true;
          state.currentUser = action.payload.user;
        }
      )
      .addCase(deleteArticle.fulfilled, (state) => {
        state.redirectTo = "/";
      })
      .addCase(register.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.inProgress = false;
        state.errors = null;
        state.redirectTo = "/";
        state.token = action.payload.user.token;
        state.currentUser = action.payload.user;
        localStorage.setItem("jwt", action.payload.user.token);
        agent.setToken(action.payload.user.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.inProgress = false;
        state.errors = action.payload ? action.payload : null;
      })
      .addCase(login.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.inProgress = false;
        state.errors = null;
        state.redirectTo = "/";
        state.token = action.payload.user.token;
        state.currentUser = action.payload.user;
        localStorage.setItem("jwt", action.payload.user.token);
        agent.setToken(action.payload.user.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.inProgress = false;
        state.errors = action.payload ? action.payload : null;
      });
  },
});

export const { unloadAuthPage } = commonSlice.actions;

export default commonSlice.reducer;
