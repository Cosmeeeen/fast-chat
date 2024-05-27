import ChatFeed from '@/components/ChatFeed';
import { createClient } from './utils/supabase';

export default async function Home() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <main className='flex h-screen flex-col items-center justify-between p-2'>
      User: {JSON.stringify(user)}
      <ChatFeed />
    </main>
  );
}
