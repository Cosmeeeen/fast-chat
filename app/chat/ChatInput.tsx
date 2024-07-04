import * as React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useUser } from '@/context/users';
import { createClient } from '@/app/utils/supabase/client';

type ChatInputProps = {
  className?: string;
  onMessageSent?: () => void;
};

const ChatInput = ({ className, onMessageSent }: ChatInputProps) => {
  const user = useUser((state) => state.user);
  const supabase = createClient();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState('');

  const handleSend = React.useCallback(async () => {
    if (!message.trim() || !user || message.length > 500) {
      return;
    }

    const newMessage = {
      text: message.trim(),
      sender_id: user?.id,
    };

    setMessage('');
    const { error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    onMessageSent?.();
    inputRef.current?.focus();
  }, [supabase, user, onMessageSent, message]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 500) {
        setMessage(e.target.value.slice(0, 500));
        return;
      }
      setMessage(e.target.value);
    },
    []
  );

  return (
    <div
      className={cn('flex w-full gap-2 px-2', className)}
      onSubmit={handleSend}
    >
      <Input
        className={cn(
          'bg-background',
          message.length >= 500 &&
            'border-destructive focus-visible:ring-destructive'
        )}
        value={message}
        onChange={handleInputChange}
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
