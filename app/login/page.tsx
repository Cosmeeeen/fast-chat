import * as React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import GoogleIcon from './GoogleIcon';

const SignIn = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect('/chat');
  }

  const gitHubSignIn = async () => {
    'use server';

    const supabase = createClient();
    const origin = headers().get('origin');

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    } else if (data.url) {
      redirect(data.url);
    }
  };

  const googleSignIn = async () => {
    'use server';

    const supabase = createClient();
    const origin = headers().get('origin');

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    } else if (data.url) {
      redirect(data.url);
    }
  };

  return (
    <main className='flex h-screen flex-row items-center justify-center gap-4 p-2'>
      <form action={gitHubSignIn}>
        <Button
          variant='outline'
          className='flex h-64 w-64 flex-col items-center justify-around'
        >
          <GitHubLogoIcon className='mr-2 h-36 w-36' /> Sign in with GitHub
        </Button>
      </form>
      <form action={googleSignIn}>
        <Button
          variant='outline'
          className='flex h-64 w-64 flex-col items-center justify-around'
        >
          <GoogleIcon className='mr-2 h-36 w-36' /> Sign in with Google
        </Button>
      </form>
    </main>
  );
};

export default SignIn;
