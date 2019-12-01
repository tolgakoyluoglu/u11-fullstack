import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthContext } from './shared/auth/authContext';
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { createGlobalStyle } from 'styled-components';
import PrivateRoute from './shared/common/PrivateRoute';

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    background-color: #FAFAFC;
    margin: 0;
    padding: 0;
    color: #262626;
    min-height: calc(90vh - 30px);
  }
`;
function App() {
  const [authTokens, setAuthTokens] = React.useState();
  const [userId, setUserId] = React.useState();
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const setTokens = data => {
    localStorage.setItem('tokens', data);
    setAuthTokens(data);
  };

  const setUser = data => {
    localStorage.setItem('userid', data);
    setUserId(data);
  };

  const authLink = setContext(() => {
    const token = localStorage.getItem('tokens');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <BrowserRouter>
        {!authTokens && <Redirect from="/" to="/login" component={Login} />}
        <AuthContext.Provider
          value={{
            authTokens,
            setAuthTokens: setTokens,
            userId,
            setUserId: setUser
          }}
        >
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/feed" component={Feed} />
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
