import Header from "./Header/Header";
import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Article from "../components/Article";
//import Editor from "../components/Editor";
import Home from "./Home";
//import Login from "../components/Login";
//import Profile from "./Profile/Profile";
//import ProfileFavorites from "./Profile/ProfileFavorites";
import Register from "../components/Register/Register";
//import Settings from "../components/Settings";
import { useAppDispatch, useAppSelector } from "../services";
import { appLoad } from "../services/commonSlice";
import agent from "../agent";

const App: React.FC = () => {
  const { appLoaded, appName, currentUser, redirectTo } = useAppSelector(
    (state) => state.common
  );

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    dispatch(appLoad({ fetcher: token ? agent.Auth.current() : null, token }));
  }, []);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
    }
  }, [redirectTo]);

  return (
    <>
      {appLoaded ? (
        <React.Fragment>
          <Header appName={appName} currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            {/*<Route path="/login" component={Login} />*/}
            <Route path="/register" component={Register} />
            {/*<Route path="/editor/:slug" component={Editor} />*/}
            {/*<Route path="/editor" component={Editor} />*/}
            <Route path="/article/:id" component={Article} />
            {/*<Route path="/settings" component={Settings} />*/}
            {/*<Route path="/@:username/favorites" component={ProfileFavorites} />*/}
            {/*<Route path="/@:username" component={Profile} />*/}
          </Switch>
        </React.Fragment>
      ) : (
        <Header appName={appName} currentUser={currentUser} />
      )}
    </>
  );
};

export default App;
