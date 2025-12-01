"use client";

import auth from "@/lib/auth";
import { Session } from "better-auth";
import { createContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Organization } from "better-auth/plugins";

interface AuthContextProps {
  session: Session | null;
  loading: boolean;
  orgs: Organization[];
  org: Organization | null;
  setOrg: (org: Organization | null) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [org, setOrg] = useState<Organization | null>(null);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      // 1) Fetch session
      const r = await auth.getSession();
      const s = r.data?.session ?? null;

      if (!s) {
        setLoading(false);
        router.replace("/auth");
        return;
      }

      setSession(s);

      // 2) Fetch orgs belonging to this session/user
      const orgRes = await auth.organization.list();
      const organizations = orgRes.data ?? [];

      setOrgs(organizations);

      // 3) Auto-select default org
      if (organizations.length > 0) {
        setOrg(organizations[0]);
      }

      setLoading(false);
    };

    load();
  }, [router]);

  const value = useMemo(
    () => ({
      session,
      loading,
      orgs,
      org,
      setOrg,
    }),
    [session, loading, orgs, org]
  );

  if (loading) return <p>Checking session...</p>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
