import ChatFeed from '@/components/ChatFeed';
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  const { data: messages } = await client
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (!user) {
    redirect('/login');
  }

  const mappedMessages = messages?.map((message) => ({
    ...message,
    isCurrentUser: message.sender_id === user.id,
  }));

  return (
    <main className='flex h-screen flex-col items-center justify-between p-2'>
      <ChatFeed initialMessages={mappedMessages || []} />
    </main>
  );
}
