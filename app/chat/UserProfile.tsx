'use client';

import React from 'react';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { useUser } from '@/context/users';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { resolve } from 'path';

export default function UserProfile({ className }: { className?: string }) {
  const user = useUser((state) => state.user);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeSwitch = React.useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [setTheme, resolvedTheme]);

  if (!user) {
    return (
      <LoaderCircle
        size={24}
        className={cn('h-16 w-16 animate-spin', className)}
      />
    );
  }

  const handleSignout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Avatar
          className={cn(
            'h-16 w-16 cursor-pointer border border-input hover:opacity-75',
            className
          )}
        >
          <AvatarImage src={user?.user_metadata.avatar_url} alt='User avatar' />
          <AvatarFallback>
            {user?.user_metadata.full_name
              .split(' ')
              .map((name: string) => name[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>User Profile</DrawerTitle>
            <DrawerDescription>
              {user?.user_metadata.full_name}
            </DrawerDescription>
          </DrawerHeader>
          <Image
            src={user?.user_metadata.avatar_url}
            alt='User avatar'
            width={150}
            height={150}
            className='mx-auto rounded-full'
          />
          <DrawerFooter>
            <Button variant='outline' onClick={handleThemeSwitch}>
              {resolvedTheme === 'light' ? 'Dark' : 'Light'} mode
            </Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
            <Button variant='destructive' onClick={handleSignout}>
              Sign Out
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
