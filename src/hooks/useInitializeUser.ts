import { useEffect } from 'react';
import { giveFirstBadge } from '@/lib/badges';
import { useAuth } from '@/hooks/useAuth';

export const useInitializeUser = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      giveFirstBadge(user.id);
    }
  }, [user]);
};
