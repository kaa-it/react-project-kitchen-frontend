import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../types";
import { TThunkAPI } from "./index";
import agent from "../agent";

export const current = createAsyncThunk<TUser, void, TThunkAPI>(
  "common/current",
  async (empty, thunkAPI) => {
    const res = await agent.Auth.current();
    const json = await res.json();
    return json.user ? json.user : thunkAPI.rejectWithValue("");
  }
);

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
    builder
      //.addCase(current.pending, (state) => state)
      //.addCase(current.rejected, (state) => state)
      .addCase(current.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.appLoaded = true;
        state.currentUser = action.payload;
      });
  },
});

export default commonSlice.reducer;
