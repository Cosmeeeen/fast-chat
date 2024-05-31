'use client';

import * as React from 'react';

import { Card } from './ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ArrowLeft, CircleArrowDown } from 'lucide-react';
import UserProfile from '@/app/chat/UserProfile';
import Link from 'next/link';
import { Tables } from '@/types/supabase';

type ChatFeedProps = {
  initialMessages?: (Tables<'messages'> & { isCurrentUser: boolean })[];
};

const ChatFeed = ({ initialMessages, ...rest }: ChatFeedProps) => {
  const chatFeedRef = React.useRef<HTMLOListElement>(null);

  const [messages, setMessages] = React.useState<
    (Tables<'messages'> & { isCurrentUser: boolean })[]
  >(initialMessages ?? []);
  const [showScrollToBottom, setShowScrollToBottom] = React.useState(false);
  const [autoScrollPaused, setAutoScrollPaused] = React.useState(false);

  const handleScroll = () => {
    if (chatFeedRef.current) {
      if (
        chatFeedRef.current.scrollTop >=
        chatFeedRef.current.scrollHeight -
          chatFeedRef.current.clientHeight -
          100
      ) {
        setAutoScrollPaused(false);
        setShowScrollToBottom(false);
      } else {
        setAutoScrollPaused(true);
        setShowScrollToBottom(true);
      }
    }
  };

  const scrollToBottom = React.useCallback(
    (force: boolean = false) => {
      if (chatFeedRef.current && (!autoScrollPaused || force)) {
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
      }
    },
    [autoScrollPaused]
  );

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = React.useCallback((message: string) => {
    setAutoScrollPaused(false);

    //todo send message
    console.log(message);
  }, []);

  return (
    <Card className='relative h-full w-full overflow-hidden md:w-1/2 2xl:w-1/4'>
      <div className='absolute flex h-20 w-full items-center justify-between border-b-[1px] bg-background p-2'>
        <Link
          className='cursor-pointer rounded p-2 transition-all hover:bg-accent hover:text-accent-foreground'
          href='/'
        >
          <ArrowLeft size={32} />
        </Link>
        <UserProfile />
      </div>
      <ol
        className='flex h-full flex-col gap-2 overflow-y-scroll p-2 pb-16 pt-24'
        ref={chatFeedRef}
        onScroll={handleScroll}
        {...rest}
      >
        {showScrollToBottom && (
          <CircleArrowDown
            size={32}
            className='absolute left-0 right-0 top-24 mx-auto rounded-full hover:bg-accent hover:text-accent-foreground'
            onClick={() => scrollToBottom(true)}
          />
        )}
        {messages.map((message, index) => {
          return <ChatMessage key={index} message={message} />;
        })}
      </ol>
      <ChatInput
        className='absolute bottom-2 z-10'
        onMessageSent={handleSendMessage}
      />
    </Card>
  );
};

export default ChatFeed;
