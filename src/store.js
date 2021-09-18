import { applyMiddleware, compose, createStore } from "redux";
import { localStorageMiddleware, promiseMiddleware } from "./middleware";
import createRootReducer from "./reducer";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        promiseMiddleware,
        localStorageMiddleware
      )
    )
  );
}

export const store = configureStore();
