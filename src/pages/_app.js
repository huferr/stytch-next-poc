import 'src/styles/global.css';
import Head from 'next/head';
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Stytch Next.js Example</title>
        <meta
          name='description'
          content='An example Next.js application using Stytch for authentication'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <StytchProvider stytch={stytch}>
        <main>
          <div className='container'>
            <Component {...pageProps} />
          </div>
        </main>
      </StytchProvider>
    </>
  );
}
