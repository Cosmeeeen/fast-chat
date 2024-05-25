import ChatInput from '@/components/ChatInput';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-between p-2'>
      <Card className='relative h-full w-full overflow-hidden md:w-1/2 2xl:w-1/4'>
        <div className='flex h-full flex-col items-center justify-center overflow-y-scroll'>
          Placeholder for messages
          {Array.from({ length: 100 }).map((_, i) => (
            <p key={i}>Message {i}</p>
          ))}
        </div>
        <ChatInput className='absolute bottom-2 z-10' />
      </Card>
    </main>
  );
}
