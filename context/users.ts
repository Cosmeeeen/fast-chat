import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

interface UserState {
  user: User | undefined;
}

export const useUser = create<UserState>(() => ({
  user: undefined,
}));
