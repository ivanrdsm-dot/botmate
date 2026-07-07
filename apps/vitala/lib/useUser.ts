"use client";

import { useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "./supabase";

export interface VitalaUser {
  id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
}

/** Estado de sesión reactivo. En modo local (sin Supabase) devuelve user=null. */
export function useUser() {
  const [user, setUser] = useState<VitalaUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setLoading(false);
      return;
    }

    const map = (u: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
    } | null): VitalaUser | null =>
      u
        ? {
            id: u.id,
            email: u.email ?? null,
            name: (u.user_metadata?.full_name as string) ?? (u.user_metadata?.name as string) ?? null,
            avatar: (u.user_metadata?.avatar_url as string) ?? null,
          }
        : null;

    sb.auth.getUser().then(({ data }) => {
      setUser(map(data.user));
      setLoading(false);
    });

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setUser(map(session?.user ?? null));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { user, loading, configured: isSupabaseConfigured };
}
