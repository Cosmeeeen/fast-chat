import { create } from 'zustand';
import type { Tables } from '@/types/supabase';

interface MessageState {
  messages: Tables<'messages'>[];
  addMessage: (newMessage: Tables<'messages'>) => void;
  optimisticDeleteMessage: (messageId: number) => void;
}

export const useMessage = create<MessageState>((set) => ({
  messages: [],
  addMessage: (newMessage: Tables<'messages'>) => {
    return set((state) => ({ messages: [...state.messages, newMessage] }));
  },
  optimisticDeleteMessage: (messageId: number) => {
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    }));
  },
}));
