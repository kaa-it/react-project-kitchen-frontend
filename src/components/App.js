import agent from "../agent";
import Header from "./Header/Header";
import React, { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from "../components/profile/Profile";
import ProfileFavorites from "../components/profile/ProfileFavorites";
import Register from '..components/Register/Register';
import Settings from '../components/Settings';
import { store } from '../store';
import { push } from 'connected-react-router';
import { userPropTypes } from '../types';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

const App = ({ appLoaded, appName, currentUser, onLoad, redirectTo, onRedirect }) => {
  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    onLoad(token ? agent.Auth.current() : null, token);
    console.log(redirectTo);
  }, []);

  useEffect(() => {
    if (redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(redirectTo));
      onRedirect();
    }
  }, [redirectTo]);

  return (
    <>
      {appLoaded ? (
        <React.Fragment>
          <Header appName={appName} currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </React.Fragment>
      ) : (
        <Header appName={appName} currentUser={currentUser} />
      )}
    </>
  );
};

App.propTypes = {
  appName: PropTypes.string,
  onLoad: PropTypes.func,
  appLoaded: PropTypes.bool,
  currentUser: userPropTypes,
  onRedirect: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
