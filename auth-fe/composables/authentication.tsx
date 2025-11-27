"use client";

import auth from "@/lib/auth";
import { Session } from "better-auth";
import { createContext, useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextProps {
  session: Session | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    auth.getSession().then((res) => {
      const s = res.data?.session ?? null;
      setSession(s);
      setLoading(false);

      if (!s) router.replace("/auth");
    });
  }, [router]);

  const value = useMemo(() => ({ session, loading }), [session, loading]);

  if (loading) return <p>Checking session...</p>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
