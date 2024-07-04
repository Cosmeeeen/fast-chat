'use client';

import * as React from 'react';
import moment from 'moment';
import Image from 'next/image';

import defaultPicture from '@/public/defaultPicture.webp';
import { Card } from '../../components/ui/card';
import { Tables } from '@/types/supabase';
import { useUser } from '@/context/users';
import { cn } from '@/lib/utils';
import { CircleProgress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ChatMessageProps = {
  message: Tables<'messages'> & {
    users?: Tables<'users'>;
  };
  firstOfUser?: boolean;
};

const getFormatedTime = (time: number) => {
  const remainingTime = 24 * 60 * 60 * 1000 - time;

  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

  if (hours) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const ChatMessage = ({
  message,
  firstOfUser = false,
  ...rest
}: ChatMessageProps) => {
  const user = useUser((state) => state.user);

  const [timeUntilDeleted, setTimeUntilDeleted] = React.useState<number>(
    Date.now() - moment(message.created_at).valueOf()
  );

  const isCurrentUser = message.sender_id === user?.id;
  const userPicture = message.users?.avatar_url;
  const userName = message.users?.display_name;
  const shouldRenderImage = !isCurrentUser && firstOfUser;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilDeleted(Date.now() - moment(message.created_at).valueOf());
    }, 6000);

    return () => clearInterval(interval);
  }, [timeUntilDeleted, message.created_at]);

  return (
    <li
      className={cn(
        'flex w-fit max-w-[75%] gap-2',
        isCurrentUser ? 'flex-row-reverse self-end' : null
      )}
      {...rest}
    >
      {shouldRenderImage && (
        <Image
          src={userPicture || defaultPicture}
          width={64}
          height={64}
          alt=''
          className='h-14 w-14 rounded-full'
        />
      )}
      {!shouldRenderImage && !isCurrentUser && <div className='w-14' />}
      <div className='flex flex-col'>
        {shouldRenderImage && (
          <p className='self-start text-muted-foreground'>{userName}</p>
        )}
        <div
          className={cn(
            'flex w-1/2 items-center justify-start',
            isCurrentUser ? 'flex-row-reverse justify-end' : null
          )}
        >
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
              'flex h-full items-center justify-center p-1 italic text-muted-foreground',
              isCurrentUser ? 'self-end' : 'self-start'
            )}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='cursor-default'>
                  <CircleProgress
                    value={
                      100 -
                      Math.round(
                        (timeUntilDeleted / (24 * 60 * 60 * 1000)) * 100
                      )
                    }
                    className='h-5 w-5'
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {getFormatedTime(timeUntilDeleted)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      </div>
    </li>
  );
};

export default ChatMessage;
