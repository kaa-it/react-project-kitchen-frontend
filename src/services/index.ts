import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import articleListReducer from "./articleListSlice";
import articleReducer from "./articleSlice";
import editorReducer from "./editorSlice";
import settingsReducer from "./settingsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    common: commonReducer,
    articleList: articleListReducer,
    article: articleReducer,
    editor: editorReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TThunkAPI = {
  dispatch: TAppDispatch;
};

export default store;
