import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Message, Segment, TextArea, Divider} from 'semantic-ui-react';

import {HeaderMessage, FooterMessage} from '../components/Common/WelcomeMessage';

function Signup() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: ''
  });

  const {firstName, lastName, email, password, bio} = user;

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const handleSubmit = (e) => e.preventDefault();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}));
  }

  return (
    <>
      <HeaderMessage/>
      <Form loading={formLoading} error={!errorMessage} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={errorMessage} onDismiss={() => setErrorMessage(null)}/>
        <Segment>
          <Form.Input
            label='First name'
            placeholder='First name'
            name='firstName'
            value={firstName}
            onChange={handleChange}
            fluid
            icon='user'
            iconPosition='left'
            required
          />
          <Form.Input
            label='Last name'
            placeholder='Last name'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            fluid
            icon='user'
            iconPosition='left'
            required
          />
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
        </Segment>
      </Form>
      <FooterMessage/>
    </>
  );
}

export default Signup;
