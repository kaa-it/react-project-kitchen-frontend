import { localStorageMiddleware, promiseMiddleware } from "./middleware";
import createRootReducer from "./reducer";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      routerMiddleware(history),
      promiseMiddleware,
      localStorageMiddleware
    ),
});
