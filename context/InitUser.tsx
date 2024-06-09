'use client';
import * as React from 'react';
import type { User } from '@supabase/supabase-js';

import { useUser } from './users';

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = React.useRef(false);

  React.useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user });
    }

    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
