'use client';

import * as React from 'react';
import { CircleArrowDown, Frown } from 'lucide-react';

import { useMessage } from '@/context/messages';
import { useUser } from '@/context/users';
import ChatMessage from './ChatMessage';
import { createClient } from '../utils/supabase/client';
import { Tables } from '@/types/supabase';

const MessageList = () => {
  const user = useUser((state) => state.user);
  const { messages, optimisticDeleteMessage, addMessage } = useMessage(
    (state) => state
  );
  const supabase = createClient();

  const listRef = React.useRef<HTMLOListElement>(null);

  const [showScrollToBottom, setShowScrollToBottom] = React.useState(false);

  const scrollToBottom = React.useCallback(() => {
    if (!listRef.current) {
      return;
    }
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [listRef]);

  const handleScroll = () => {
    if (listRef.current) {
      if (
        listRef.current.scrollTop >=
        listRef.current.scrollHeight - listRef.current.clientHeight - 100
      ) {
        setShowScrollToBottom(false);
      } else {
        setShowScrollToBottom(true);
      }
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Real-time
  React.useEffect(() => {
    const channel = supabase.channel('messages');

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          const { error, data } = await supabase
            .from('users')
            .select('*')
            .eq('id', payload.new.sender_id)
            .single();

          if (error) {
            console.error(error);
            return;
          }

          console.log('user: ', data);

          const newMessage = {
            ...payload.new,
            users: data as Tables<'users'>,
          };

          addMessage(newMessage as unknown as Tables<'messages'>);
          if (payload.new.sender_id === user?.id || !showScrollToBottom) {
            scrollToBottom();
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [
    supabase,
    optimisticDeleteMessage,
    addMessage,
    scrollToBottom,
    showScrollToBottom,
    user,
  ]);

  return (
    <ol
      className='flex h-full flex-col gap-2 overflow-y-scroll p-2 pb-16 pt-24'
      ref={listRef}
      onScroll={handleScroll}
    >
      {showScrollToBottom && (
        <CircleArrowDown
          size={32}
          className='absolute left-0 right-0 top-24 mx-auto rounded-full hover:bg-accent hover:text-accent-foreground'
          onClick={() => scrollToBottom()}
        />
      )}
      {messages.length === 0 && (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <Frown size={32} className='h-12 w-12' />
          <p>No messages yet...</p>
          <p>Send a message to start chatting!</p>
        </div>
      )}
      {messages.map((message, index) => {
        const firstOfUser =
          index === 0 || messages[index - 1].sender_id !== message.sender_id;
        return (
          <ChatMessage
            key={index}
            message={message}
            firstOfUser={firstOfUser}
          />
        );
      })}
    </ol>
  );
};

export default MessageList;
