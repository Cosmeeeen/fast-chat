import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-2 p-2'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
        Welcome to the fast chat app!{' '}
      </h1>
      <h3>
        This is a global chat room where messages are deleted after 24 hours.
      </h3>
      <Link href='/chat'>
        <Button>Start Chatting</Button>
      </Link>
    </main>
  );
}
