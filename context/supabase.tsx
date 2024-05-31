'use client';

import * as React from 'react';

import { createClient } from '@/app/utils/supabase/client';

const SupabaseContext = React.createContext<any>({});

const SupabaseProvider = ({ children }: { children: any }) => {
  const supabase = createClient();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase.auth]);

  const exposed = {
    user,
    loading: !user,
  };

  return (
    <SupabaseContext.Provider value={exposed}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useUser = () => React.useContext(SupabaseContext);

export default SupabaseProvider;
