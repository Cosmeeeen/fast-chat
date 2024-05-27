import * as React from 'react';
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { createClient } from '@/app/utils/supabase';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const SignIn = () => {
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
    <main className='flex h-screen flex-col items-center justify-center p-2'>
      <form action={gitHubSignIn}>
        <Button>
          <GitHubLogoIcon className='mr-2 h-4 w-4' /> Sign in with GitHub
        </Button>
      </form>
      <form action={googleSignIn}>
        <Button>
          <GlobeIcon className='mr-2 h-4 w-4' /> Sign in with Google
        </Button>
      </form>
    </main>
  );
};

export default SignIn;
