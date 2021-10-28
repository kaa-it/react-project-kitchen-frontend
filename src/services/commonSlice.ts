import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../types";
import { TThunkAPI } from "./index";

interface IUserResult {
  user: TUser;
}

interface IAppLoadParams {
  fetcher: Promise<IUserResult> | null;
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
    let res: IUserResult | null = null;
    if (params.fetcher) {
      res = await params.fetcher;
    }

    return { token: params.token, user: res ? res.user : null };
  } catch (err) {
    console.log("common/appLoad", err);
    return thunkAPI.rejectWithValue("");
  }
});

type TCommonSliceState = {
  appLoaded: boolean;
  token: string | null;
  currentUser: TUser | null;
  redirectTo: string | null;
  appName: "Научная фантастика";
};

const initialState: TCommonSliceState = {
  appLoaded: false,
  token: localStorage.getItem("jwt"),
  currentUser: null,
  redirectTo: null,
  appName: "Научная фантастика",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      appLoad.fulfilled,
      (state, action: PayloadAction<IAppLoadResult>) => {
        state.token = action.payload.token;
        state.appLoaded = true;
        state.currentUser = action.payload.user;
      }
    );
  },
});

export default commonSlice.reducer;
