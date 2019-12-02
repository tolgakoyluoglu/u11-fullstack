import React, { useContext } from 'react';
import { AuthContext } from '../../shared/auth/AuthContext';
import {
  Navbar,
  List,
  ListItem,
  StyledLink,
  PageContainer,
  PageHeader,
  SearchInput,
  Form,
  Paragraph
} from './Navbar';
import { useMutation } from '@apollo/react-hooks';
import { SEARCH_USER } from '../../shared/utils/graphql';
import { LoadingContainer, Loader } from '../../styled/Loading';
import { Redirect } from 'react-router-dom';

const Header = () => {
  const { setAuthTokens, authTokens, userId, setUserId } = useContext(
    AuthContext
  );
  const [username, setValue] = React.useState('');
  const [searchUser, { data, loading, error }] = useMutation(SEARCH_USER, {
    variables: { username }
  });

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  const logout = () => {
    setAuthTokens();
    setUserId();
    localStorage.clear();
  };

  if (data) {
    return (
      <>
        <Header />
        <Redirect
          to={{ pathname: '/profile/' + data.searchUser[0]._id }}
          component={Header}
        />
      </>
    );
  }
  if (error) {
    console.log('fel');
  }
  const handleSubmit = event => {
    event.preventDefault();
    searchUser();
    setValue();
  };

  return (
    <PageContainer>
      <Navbar>
        <StyledLink to={authTokens ? '/feed' : '/login'}>
          <PageHeader>InstaClone</PageHeader>
        </StyledLink>
        {authTokens && (
          <>
            <Form type="submit" onSubmit={handleSubmit}>
              <SearchInput
                value={username}
                type="text"
                onChange={event => setValue(event.target.value)}
                placeholder="Search.."
              />
              {error && <Paragraph>User not found</Paragraph>}
            </Form>

            <List>
              <ListItem>
                <StyledLink to="/feed">Feed</StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to={{ pathname: '/profile/' + userId }}>
                  Profile
                </StyledLink>
              </ListItem>
              <ListItem>
                <StyledLink to="/login" onClick={logout}>
                  Logout
                </StyledLink>
              </ListItem>
            </List>
          </>
        )}
      </Navbar>
    </PageContainer>
  );
};

export default Header;
