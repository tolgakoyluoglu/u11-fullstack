import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Components
import { Card, Form, Input, Button } from '../../../styled/LoginForm';
import { useAuth } from '../../../shared/auth/authContext';
//Apollo stuff
import { useMutation } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../../styled/Loading';
import { LOGIN_USER } from '../../../shared/utils/graphql';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAuthTokens } = useAuth();

  const [loginUser, { data, loading }] = useMutation(LOGIN_USER, {
    variables: { email: email, password: password }
  });
  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  if (data) {
    setAuthTokens(data.login.token);
    return <Redirect to="/feed" />;
  }
  const handleSubmit = event => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Card>
      <Form type="submit" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit" value="Submit">
          Sign In
        </Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
    </Card>
  );
};

export default Login;