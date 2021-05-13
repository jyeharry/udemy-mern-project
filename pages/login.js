import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Message, Segment, TextArea, Divider} from 'semantic-ui-react';

import {HeaderMessage, FooterMessage} from '../components/Common/WelcomeMessage';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => setSubmitDisabled(!(email && password)));

  return (
    <>
      <HeaderMessage/>
      <Form loading={formLoading} error={!!errorMessage} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={errorMessage} onDismiss={() => setErrorMessage(null)}/>
        <Segment>
          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            fluid
            icon='envelope'
            iconPosition='left'
            type='email'
            required
          />
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword)
            }}
            iconPosition='left'
            type={showPassword ? 'text' : 'password'}
            required
          />
          <Divider hidden/>
          <Button
            icon='signup'
            content='Log in'
            type='submit'
            color='teal'
            disabled={submitDisabled}
          />
        </Segment>
      </Form>
      <FooterMessage/>
    </>
  );
}

export default Login;
