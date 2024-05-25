import * as React from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Input } from './ui/input';
import { Button } from './ui/button';

type ChatInputProps = {
  className?: string;
};

const ChatInput = ({ className }: ChatInputProps) => {
  return (
    <div className={cn('flex w-full gap-2 px-2', className)}>
      <Input className='bg-background' />
      <Button variant='outline' size='icon' className='bg-background'>
        <Send className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    </div>
  );
};

export default ChatInput;
