import { Tables } from './supabase';

export type ModifiedMessage = Tables<'messages'> & {
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
};
