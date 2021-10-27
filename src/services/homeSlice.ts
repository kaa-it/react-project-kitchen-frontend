import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTags } from "../types";
import { TThunkAPI } from "./index";
import { API_ROOT } from "../utils";

// export const feed = createAsyncThunk<TFeedResult, void, TThunkAPI>(
//     "home/feed",
//     async (empty: void, thunkAPI) => {
//         const res = await fetch(`${API_ROOT}/articles/feed?limit=10&offset=0`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${localStorage.getItem("jwt")}`,
//             } as HeadersInit,
//         });
//
//         const json = await res.json();
//
//         return json.articles ? json.articles
//     }
// );

export const getAllTags = createAsyncThunk<TTags, void, TThunkAPI>(
  "home/tags",
  async (empty, thunkAPI) => {
    const res = await fetch(`${API_ROOT}/tags`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("jwt")}`,
      } as HeadersInit,
    });

    const json = await res.json();

    return json.tags ? json.tags : thunkAPI.rejectWithValue("");
  }
);

type THomeSliceState = {
  tags: TTags | null;
};

const initialState: THomeSliceState = {
  tags: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllTags.fulfilled,
      (state, action: PayloadAction<TTags>) => {
        state.tags = action.payload;
      }
    );
  },
});

export default homeSlice.reducer;
