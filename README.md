# Stytch Next.js Page Router example application

<p align="center">
  <img src="https://user-images.githubusercontent.com/100632220/217049841-b9eeb72a-3e50-4074-839a-e64ee5d4a88c.png" width="750">
</p>

## Overview

This example application demonstrates how one may use Stytch within a Next.js application using the new [Page Router](https://nextjs.org/docs/pages).

This project uses Stytch's [Next.js SDK](https://stytch.com/docs/sdks/javascript-sdk) which provides pre-built UI components, useful React hooks, headless methods to securely interact with Stytch, and is SSR friendly.

This application features Email Magic Links and Google OAuth authentication.

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Once your account is set up a Project called "My first project" will be automatically created for you.

2. Within your new Project, navigate to [SDK configuration](https://stytch.com/dashboard/sdk-configuration), and click **Enable SDK**.

3. Navigate to [OAuth](https://stytch.com/dashboard/oauth), and enable login for Google in the Test environment. Config will be done for you automatically in Test.

   <img width="400" alt="OAuth configuration" src="https://user-images.githubusercontent.com/100632220/217055674-a7dafc17-6ad3-492f-8dd2-92560d60dc00.png">

4. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.

### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/cal-stytch/stytch-nextjs-example.git
cd stytch-nextjs-example
# Install dependencies, you may use either pnpm or npm.
pnpm i
# or
npm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abcd123-0000-0000-abcd-1234567abc
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
```

## Running locally

After completing all the set up steps above the application can be run with the command:

```bash
pnpm run dev
# or
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

You'll be able to login with Email Magic Links or Google OAuth and see your Stytch User object, Stytch Session, and see how logging out works.

## Next steps

This example app showcases a small portion of what you can accomplish with Stytch. Here are a few ideas to explore:

1. Add additional login methods like [Passwords](https://stytch.com/docs/guides/passwords/sdk).
2. Replace the prebuilt UI with your own using by using the SDK's [headless methods](https://stytch.com/docs/sdks/javascript-sdk).
3. Replace the Google OAuth button with the high converting [Google One Tap UI](https://stytch.com/docs/guides/oauth/sdk).
4. Secure your app further by building MFA authentication using methods like [WebAuthn](https://stytch.com/docs/sdks/javascript-sdk/webauthn).
