import * as React from 'react';
import { Card } from './ui/card';

type ChatMessageProps = {
  message: string;
  isCurrentUser?: boolean;
};

const ChatMessage = ({ message, isCurrentUser, ...rest }: ChatMessageProps) => {
  if (isCurrentUser) {
    return (
      <li className='w-fit max-w-[75%] self-end' {...rest}>
        <Card>
          <p className='break-words p-2'>{message}</p>
        </Card>
      </li>
    );
  }

  return (
    <li className='w-fit max-w-[75%] ' {...rest}>
      <Card className='bg-primary text-primary-foreground'>
        <p className='p-2'>{message}</p>
      </Card>
    </li>
  );
};

export default ChatMessage;
