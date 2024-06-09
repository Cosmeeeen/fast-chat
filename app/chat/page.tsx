import ChatFeed from '@/app/chat/ChatFeed';
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';
import InitUser from '@/context/InitUser';

export default async function Home() {
  const client = createClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className='flex h-screen flex-col items-center justify-between p-2'>
      <ChatFeed />
      <InitUser user={user} />
    </main>
  );
}
