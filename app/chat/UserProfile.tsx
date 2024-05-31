'use client';

import React from 'react';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type User } from '@supabase/supabase-js';
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
import { useUser } from '@/context/supabase';

export default function UserProfile({ className }: { className?: string }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <LoaderCircle
        size={32}
        className={cn('h-16 w-16 animate-spin', className)}
      />
    );
  }

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
            <Button variant='destructive'>Sign Out</Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
