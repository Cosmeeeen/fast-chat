import * as React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Input } from './ui/input';
import { Button } from './ui/button';

type ChatInputProps = {
  className?: string;
  onMessageSent: (message: string) => void;
};

const ChatInput = ({ className, onMessageSent }: ChatInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState('');

  const handleSend = React.useCallback(() => {
    if (message) {
      onMessageSent(message);
      setMessage('');
    }
    inputRef.current?.focus();
  }, [message, onMessageSent]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div
      className={cn('flex w-full gap-2 px-2', className)}
      onSubmit={handleSend}
    >
      <Input
        className='bg-background'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <Button
        variant='outline'
        size='icon'
        className='bg-background'
        onClick={handleSend}
      >
        <Send className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    </div>
  );
};

export default ChatInput;
