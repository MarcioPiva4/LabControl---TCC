import { Session as NextAuthSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; 
      isFirstLogin?: string;
      id: string;
    };
  }
}

export type Session = NextAuthSession;