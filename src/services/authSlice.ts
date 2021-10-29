import { TErrors, TUser } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TThunkAPI } from "./index";

type TUserResult = {
  user: TUser;
};

interface IRegisterParams {
  fetcher: Promise<TUserResult>;
}

type TRegisterThunkAPI = TThunkAPI & { rejectValue: TErrors };

export const register = createAsyncThunk<
  TUserResult,
  IRegisterParams,
  TRegisterThunkAPI
>("auth/register", async (params: IRegisterParams, thunkAPI) => {
  try {
    return await params.fetcher;
  } catch (err) {
    console.log("auth/register", err);
    // @ts-ignore
    return thunkAPI.rejectWithValue(err.response.body.errors);
  }
});

interface IAuthSliceState {
  inProgress: boolean | null;
  errors: TErrors | null;
}

const initialState: IAuthSliceState = {
  inProgress: null,
  errors: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.inProgress = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.inProgress = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.inProgress = false;
        state.errors = action.payload ? action.payload : null;
      });
  },
});

export const { clearAuthSlice } = authSlice.actions;

export default authSlice.reducer;
