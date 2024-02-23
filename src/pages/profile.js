import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStytch, useStytchSession, useStytchUser } from '@stytch/nextjs';
import loadStytch from 'lib/loadStytch';

export default function ProfilePage() {
  const { user, isInitialized } = useStytchUser();
  const { session } = useStytchSession();
  const stytch = useStytch();

  const activated2fa = session && session.authentication_factors.length >= 2;

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!activated2fa) router.push('/2fa');

    if (!user) router.push('/');
  }, [user, isInitialized, router, activated2fa]);

  if (!isInitialized || !user || !session) return <div>Loading...</div>;

  return (
    <div className='card'>
      <h1>Profile</h1>
      <h2>User object</h2>
      <pre className='code-block'>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <h2>Session object</h2>
      <pre className='code-block'>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <p>
        You are logged in, and a Session has been created. The SDK stores the
        Session as a token and a JWT in the browser cookies as{' '}
        <span className='code'>stytch_session</span> and{' '}
        <span className='code'>stytch_session_jwt</span> respectively.
      </p>
      <button
        className='primary'
        onClick={() => {
          stytch.session.revoke();
          router.push('/');
        }}
      >
        Log out
      </button>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const redirectRes = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
  const sessionJWT = req.cookies['stytch_session_jwt'];

  if (!sessionJWT) {
    return redirectRes;
  }

  // loadStytch() is a helper function for initalizing the Stytch Backend SDK. See the function definition for more details.
  const stytchClient = loadStytch();

  try {
    // Authenticate the session JWT. If an error is thrown the session authentication has failed.
    await stytchClient.sessions.authenticateJwt({ session_jwt: sessionJWT });
    return { props: {} };
  } catch (e) {
    return redirectRes;
  }
}
