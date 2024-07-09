'use client';

import * as React from 'react';

import { Card } from '../../components/ui/card';
import ChatInput from './ChatInput';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import UserProfile from '@/app/chat/UserProfile';
import Link from 'next/link';
import { createClient } from '@/app/utils/supabase/client';
import { useMessage } from '@/context/messages';
import MessageList from './MessageList';
import moment from 'moment';
import DateAndTime from '@/components/DateAndTime';

const ChatFeed = () => {
  const supabase = createClient();
  const [loadingMessages, setLoadingMessages] = React.useState(true);

  React.useEffect(() => {
    // get initial messages
    // This should work on the server, but I've spent 5 days debugging so I'll just leave it here
    async function fetchData() {
      return await supabase
        .from('messages')
        .select('*,users(*)')
        .order('created_at', { ascending: false })
        .limit(3);
    }
    fetchData().then(({ data: messages }) => {
      useMessage.setState({ messages: messages?.reverse() || [] });
      setLoadingMessages(false);
    });
  }, [supabase]);

  return (
    <Card className='relative h-full w-full overflow-hidden md:w-1/2 2xl:w-1/4'>
      <div className='absolute z-10 flex h-20 w-full items-center justify-between border-b-[1px] bg-background p-2'>
        <Link
          className='cursor-pointer rounded p-2 transition-all hover:bg-accent hover:text-accent-foreground'
          href='/'
        >
          <ArrowLeft size={32} />
        </Link>
        <DateAndTime />
        <UserProfile />
      </div>
      {loadingMessages ? (
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <LoaderCircle size={32} className={'h-16 w-16 animate-spin'} />
          <p>Loading messages...</p>
        </div>
      ) : (
        <MessageList />
      )}
      <ChatInput className='absolute bottom-2 z-10' />
    </Card>
  );
};

export default ChatFeed;
