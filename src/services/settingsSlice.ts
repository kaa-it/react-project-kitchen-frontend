import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TArticle, TArticleResult, TErrors, TUser } from "../types";
import { TThunkAPI } from "./index";
import agent from "../agent";

export interface ISaveSettingsParams {
  fetcher: Promise<{}>;
}

type TSaveSettingsThunkAPI = TThunkAPI & { rejectValue: TErrors };

export const saveSettings = createAsyncThunk<
  void,
  ISaveSettingsParams,
  TSaveSettingsThunkAPI
>("setting/saveSettings", async (params, thunkAPI) => {
  try {
    await params.fetcher;
  } catch (err) {
    console.log("settings/saveSettings", err);
    // @ts-ignore
    return thunkAPI.rejectWithValue(err.response.body.errors);
  }
});

type TSettingsSliceState = {
  inProgress: boolean;
  errors: TErrors | null;
};

const initialState: TSettingsSliceState = {
  inProgress: false,
  errors: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    unload: (state) => {
      state.inProgress = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSettings.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.inProgress = false;
        state.errors = null;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.inProgress = false;
        state.errors = action.payload ? action.payload : null;
      })
  },
});

export const { unload } = settingsSlice.actions;

export default settingsSlice.reducer;
