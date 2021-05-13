import {Icon, Message, Divider} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export const HeaderMessage = () => {
  const router = useRouter();
  const isSignupRoute = router.pathname === '/signup';

  return (
    <Message
      color='teal'
      header={isSignupRoute ? 'Get started' : 'Welcome back'}
      icon={isSignupRoute ? 'settings' : 'privacy'}
      content={isSignupRoute ? 'Create new account' : 'Login with email and password'}
    />
  );
}

export const FooterMessage = () => {
  const router = useRouter();
  const isSignupRoute = router.pathname === '/signup';

  return (
    <>
      {isSignupRoute ? (
        <>
          <Message warning>
            <Icon name='help'/>
            Existing user? <Link href='/login'>Login here instead</Link>
          </Message>
          <Divider hidden/>
        </>
      ) : (
      <>
        <Message attached='bottom' info>
          <Icon name='lock'/>
          <Link href='/reset'>Forgot password?</Link>
        </Message>

        <Message warning>
          <Icon name='help'/>
          New user? <Link href='/signup'>Sign up here instead</Link>
        </Message>
      </>
      )}
    </>
  );
}
