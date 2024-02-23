import { useState } from 'react';
import { useRouter } from 'next/router';
import { useStytch } from '@stytch/nextjs';

export default function RegisterPage() {
  const stytchClient = useStytch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  const createPassword = () => {
    stytchClient.passwords
      .create({
        email: email,
        password: password,
        session_duration_minutes: 60,
      })
      .then((response) => {
        router.push('2fa');
      })
      .catch((error) => {
        if (error.message.includes('duplicate_email')) {
          setError('Email already exists');
        }
      });
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
      <h1>Register</h1>
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
        onClick={createPassword}
      >
        Register
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
