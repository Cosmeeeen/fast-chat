import * as React from 'react';
import { Card } from './ui/card';

type ChatMessageProps = {
  message: string;
  isCurrentUser?: boolean;
};

const ChatMessage = ({ message, isCurrentUser, ...rest }: ChatMessageProps) => {
  if (isCurrentUser) {
    return (
      <Card className='w-fit max-w-[75%] self-end' {...rest}>
        <p className='break-words p-2'>{message}</p>
      </Card>
    );
  }

  return (
    <Card
      className='w-fit max-w-[75%] bg-primary text-primary-foreground'
      {...rest}
    >
      <p className='p-2'>{message}</p>
    </Card>
  );
};

export default ChatMessage;
