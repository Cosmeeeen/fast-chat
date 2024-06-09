'use client';

import * as React from 'react';
import { Card } from '../../components/ui/card';
import { Tables } from '@/types/supabase';
import { useUser } from '@/context/users';

type ChatMessageProps = {
  message: Tables<'messages'>;
};

const ChatMessage = ({ message, ...rest }: ChatMessageProps) => {
  const user = useUser((state) => state.user);

  const isCurrentUser = message.sender_id === user?.id;

  if (isCurrentUser) {
    return (
      <li className='w-fit max-w-[75%] self-end' {...rest}>
        <Card>
          <p className='break-words p-2'>{message.text}</p>
        </Card>
      </li>
    );
  }

  return (
    <li className='w-fit max-w-[75%] ' {...rest}>
      <Card className='bg-primary text-primary-foreground'>
        <p className='break-words p-2'>{message.text}</p>
      </Card>
    </li>
  );
};

export default ChatMessage;
