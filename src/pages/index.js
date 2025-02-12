import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStytch, useStytchUser } from '@stytch/nextjs';

export default function LoginPage() {
  const { user } = useStytchUser();
  const router = useRouter();
  const stytchClient = useStytch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authenticate = () =>
    stytchClient.passwords
      .authenticate({
        email: email,
        password: password,
        session_duration_minutes: 60,
      })
      .then((response) => {
        router.push('/2fa');
      })
      .catch((error) => {
        setError('Invalid email or password');
      });

  const handleLogin = () => {
    if (user) {
      stytchClient.session.revoke().then(() => {
        authenticate();
      });

      return;
    }

    authenticate();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <h1>Login</h1>
      <input
        type='text'
        placeholder='Enter your email'
        style={{ padding: '6px 12px', fontSize: '16px' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter your password'
        style={{ padding: '6px 12px', fontSize: '16px' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{ padding: '6px 12px', fontSize: '16px' }}
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        style={{ padding: '6px 12px', fontSize: '16px' }}
        onClick={() => router.push('/register')}
      >
        Register
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
