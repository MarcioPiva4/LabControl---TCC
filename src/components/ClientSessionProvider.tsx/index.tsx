'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

type ClientSessionProviderProps = {
  session: Session | null;
  children: React.ReactNode;
};

export default function ClientSessionProvider({
  session,
  children,
}: ClientSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
