import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Components
import { Card, Input } from '../Styled';
import { Button, Form } from '../../../shared/styled/Styled';
//Apollo stuff
import { useMutation } from '@apollo/react-hooks';
import { LoadingContainer, Loader } from '../../../shared/styled/Loading';
import { CREATE_USER } from '../../../shared/utils/graphql';

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    variables: { email: email, username: username, password: password }
  });
  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }
  if (data) {
    return <Redirect to="/login" />;
  }
  const handleSubmit = event => {
    event.preventDefault();
    createUser();
  };

  return (
    <Card>
      <Form type="submit" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <Input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p>Username or email already exists.</p>}
        <Button type="submit" value="Submit">
          Sign up
        </Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
};

export default SignUp;
