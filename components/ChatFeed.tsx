'use client';

import * as React from 'react';

import { Card } from './ui/card';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { CircleArrowDown } from 'lucide-react';

const mockMessages = [
  {
    message: 'Hello world',
    isCurrentUser: false,
  },
  {
    message: 'Hello world',
    isCurrentUser: true,
  },
  {
    message: 'Hello world',
    isCurrentUser: false,
  },
  {
    message: 'Hello world',
    isCurrentUser: true,
  },
  {
    message: 'Hello world',
    isCurrentUser: false,
  },
  {
    message: 'Hello world',
    isCurrentUser: true,
  },
  {
    message: 'Hello world',
    isCurrentUser: false,
  },
  {
    message: 'Hello world',
    isCurrentUser: true,
  },
  {
    message: 'Hello world',
    isCurrentUser: false,
  },
  {
    message: 'Hello world',
    isCurrentUser: true,
  },
];

type ChatFeedProps = {};

const ChatFeed = ({ ...rest }: ChatFeedProps) => {
  const chatFeedRef = React.useRef<HTMLDivElement>(null);

  const [messages, setMessages] = React.useState(mockMessages);
  const [showScrollToBottom, setShowScrollToBottom] = React.useState(false);

  const handleScroll = () => {
    if (chatFeedRef.current) {
      if (
        chatFeedRef.current.scrollTop >=
        chatFeedRef.current.scrollHeight -
          chatFeedRef.current.clientHeight -
          100
      ) {
        setShowScrollToBottom(false);
      } else {
        setShowScrollToBottom(true);
      }
    }
  };

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        message,
        isCurrentUser: true,
      },
    ]);
  };

  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Card className='relative h-full w-full overflow-hidden md:w-1/2 2xl:w-1/4'>
      {showScrollToBottom && (
        <CircleArrowDown
          size={32}
          className='absolute left-0 right-0 top-2 mx-auto rounded-full hover:bg-accent hover:text-accent-foreground'
          onClick={() => scrollToBottom()}
        />
      )}
      <div
        className='flex h-full flex-col gap-2 overflow-y-scroll p-2 pb-16'
        ref={chatFeedRef}
        onScroll={handleScroll}
        {...rest}
      >
        {/* Messges will go below */}
        <ChatMessage message={'This is the first messaage'} />
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message.message}
              isCurrentUser={message.isCurrentUser}
            />
          );
        })}
        <ChatMessage message={'This is the last messaage'} />
      </div>
      <ChatInput
        className='absolute bottom-2 z-10'
        onMessageSent={handleSendMessage}
      />
    </Card>
  );
};

export default ChatFeed;
