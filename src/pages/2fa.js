/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStytchUser, useStytch } from '@stytch/nextjs';

const TwoFA = () => {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();

  const [code, setCode] = useState('');
  const [new2fa, setNew2fa] = useState(null);
  const [error, setError] = useState('');

  const create2fa = () => {
    stytch.totps.create({ expiration_minutes: 1440 }).then((response) => {
      setNew2fa(response);
    });
  };

  const verify2fa = () => {
    stytch.totps
      .authenticate({
        totp_code: code,
        session_duration_minutes: 5,
      })
      .then(() => {
        router.push('/profile');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const hasNo2FA = user && Object.keys(user.totps).length === 0;

  useEffect(() => {
    if (code.length === 6) {
      verify2fa();
    }
  }, [code]);

  useEffect(() => {
    if (!user) router.replace('/');
  }, [user]);

  if (!isInitialized || !user) return <div>Loading...</div>;

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
      <h1>2FA authentication</h1>

      {hasNo2FA && !new2fa ? (
        <button onClick={create2fa} style={{ padding: '6px 12px' }}>
          Create 2FA
        </button>
      ) : (
        <>
          <input
            type='text'
            placeholder='Enter the code from your authenticator app'
            style={{ padding: '6px 12px', fontSize: '16px', width: '340px' }}
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}

      {new2fa && (
        <div>
          <p>
            Scan the QR code below with your authenticator app to get started.
          </p>
          <img src={new2fa.qr_code} alt='QR code' width={200} height={200} />
        </div>
      )}
    </div>
  );
};

export default TwoFA;
