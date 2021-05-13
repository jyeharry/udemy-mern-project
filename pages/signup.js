import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Message, Segment, TextArea, Divider} from 'semantic-ui-react';

import {HeaderMessage, FooterMessage} from '../components/Common/WelcomeMessage';
import SocialInputs from '../components/Common/SocialInputs';
import ImageDropDiv from '../components/Common/ImageDropDiv';

const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

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
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => setSubmitDisabled(!(firstName && lastName && email && password)));

  const handleSubmit = (e) => e.preventDefault();

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if (name === 'media') {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setUser(prev => ({...prev, [name]: value}));
  }

  return (
    <>
      <HeaderMessage/>
      <Form loading={formLoading} error={!!errorMessage} onSubmit={handleSubmit}>
        <Message error header='Oops!' content={errorMessage} onDismiss={() => setErrorMessage(null)}/>
        <Segment>
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />
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
            loading={usernameLoading}
            error={!usernameAvailable}
            label='Username'
            placeholder='Username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameAvailable(regexUsername.test(e.target.value));
            }}
            fluid
            icon={usernameAvailable ? 'check' : 'close'}
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
          <Form.Field
            label='Bio'
            control={TextArea}
            name='bio'
            value={bio}
            onChange={handleChange}
            placeholder='Bio...'
          />
          <SocialInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />
          <Divider hidden/>
          <Button
            icon='signup'
            content='Sign up'
            type='submit'
            color='teal'
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage/>
    </>
  );
}

export default Signup;
