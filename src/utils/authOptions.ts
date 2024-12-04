import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Administrador } from "@/models/Administrador";
import { Professor } from "@/models/Professor";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
    isFirstLogin?: boolean;
  }

  interface Session {
    user: User;
    token: string;
  }

  interface JWT {
    id: string;
    role: string;
    isFirstLogin?: boolean;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userEmailAdministrador = await Administrador.findOne({
          where: { email: credentials?.email },
        }) as any;

        if (userEmailAdministrador && userEmailAdministrador.senha == credentials?.password) {
          const isFirstLogin = userEmailAdministrador.loginCount === 0;

          await Administrador.increment("loginCount", {
            by: 1,
            where: { id: userEmailAdministrador.id },
          });

          return {
            id: userEmailAdministrador.id,
            name: userEmailAdministrador.nome,
            email: userEmailAdministrador.email,
            role: "adm",
            isFirstLogin: isFirstLogin,
          };
        }

        const userEmailProfessor = await Professor.findOne({
          where: { email: credentials?.email },
        }) as any;

        if (userEmailProfessor && userEmailProfessor.senha == credentials?.password) {
          const isFirstLogin = userEmailProfessor.loginCount === 0;

          await Professor.increment("loginCount", {
            by: 1,
            where: { id: userEmailProfessor.id },
          });

          return {
            id: userEmailProfessor.id,
            name: userEmailProfessor.nome,
            email: userEmailProfessor.email,
            role: "prof",
            isFirstLogin: isFirstLogin,
          };
        }

        throw new Error("Email ou senha inválidos. Verifique suas credenciais e tente novamente.");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isFirstLogin = user.isFirstLogin;
        token.accessToken = `${user.id}-${user.role}`; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isFirstLogin = token.isFirstLogin as boolean;
        session.token = token.accessToken as string;
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        const userFromDb =
          (await Administrador.findOne({ where: { email: profile?.email } })) ||
          (await Professor.findOne({ where: { email: profile?.email } }));

        if (!userFromDb) {
          return `/login?error=${account.provider}Unauthorized`;
        }
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
