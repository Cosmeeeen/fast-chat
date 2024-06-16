'use client';

import * as React from 'react';
import moment from 'moment';
import Image from 'next/image';

import defaultPicture from '@/public/defaultPicture.webp';
import { Card } from '../../components/ui/card';
import { Tables } from '@/types/supabase';
import { useUser } from '@/context/users';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: Tables<'messages'> & {
    users?: Tables<'users'>;
  };
  firstOfUser?: boolean;
};

const ChatMessage = ({
  message,
  firstOfUser = false,
  ...rest
}: ChatMessageProps) => {
  const user = useUser((state) => state.user);

  const [messageTime, setMessageTime] = React.useState<string>(
    moment(message.created_at).fromNow(true) + ' ago'
  );

  const isCurrentUser = message.sender_id === user?.id;
  const userPicture = message.users?.avatar_url;
  const userName = message.users?.display_name;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageTime(moment(message.created_at).fromNow(true) + ' ago');
    }, 60000);

    return () => clearInterval(interval);
  }, [messageTime, message.created_at]);

  return (
    <li
      className={cn(
        'flex w-fit max-w-[75%] gap-2',
        isCurrentUser ? 'flex-row-reverse self-end' : null
      )}
      {...rest}
    >
      {!isCurrentUser && (
        <Image
          src={userPicture || defaultPicture}
          width={64}
          height={64}
          alt=''
          className={cn(
            'h-14 w-14 rounded-full',
            !firstOfUser ? 'opacity-0' : null
          )}
        />
      )}
      <div className='flex flex-col'>
        {!isCurrentUser && firstOfUser && (
          <p className='self-start text-muted-foreground'>{userName}</p>
        )}
        <Card
          className={cn(
            'flex flex-col gap-2 p-2',
            isCurrentUser ? null : 'bg-primary text-primary-foreground'
          )}
        >
          <p className='break-words'>{message.text}</p>
        </Card>
        <p
          className={cn(
            'italic text-muted-foreground',
            isCurrentUser ? 'self-end' : 'self-start'
          )}
        >
          {messageTime}
        </p>
      </div>
    </li>
  );
};

export default ChatMessage;
