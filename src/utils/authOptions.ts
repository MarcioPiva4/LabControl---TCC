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
  }

  interface JWT {
    id: string;
    role: string;
    isFirstLogin?: boolean;
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

        // Nenhum usuário encontrado no banco de dados
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
    async jwt({ token, account, profile, user, trigger, session }) {
      if (trigger === "update" && session) {
        return {
          ...token,
          name: session.name || token.name,
        };
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isFirstLogin = user.isFirstLogin;
      }

      if (account && profile) {
        if (account.provider === "google" || account.provider === "facebook") {
          const userFromDb =
            (await Administrador.findOne({ where: { email: token.email } })) as any ||
            (await Professor.findOne({ where: { email: token.email } })) as any;

          if (userFromDb) {
            token.id = userFromDb.id;
            token.role = userFromDb instanceof Administrador ? "adm" : "prof";
            token.isFirstLogin = userFromDb.loginCount === 0;

            await userFromDb.increment("loginCount", { by: 1 });

            // Remover a imagem do token
            delete token.picture;
          } else {
            throw new Error("Usuário não autorizado. Contate o administrador.");
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isFirstLogin = token.isFirstLogin as boolean;

        // Garantir que a imagem não seja propagada para a sessão
        if (session.user.image) {
          session.user.image = null;
        }
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const userFromDb =
          (await Administrador.findOne({ where: { email: profile?.email } })) ||
          (await Professor.findOne({ where: { email: profile?.email } }));

        if (!userFromDb) {
          return `/login?error=googleUnauthorized`;
        }
      } else if (account?.provider === "facebook") {
        const userFromDb =
          (await Administrador.findOne({ where: { email: profile?.email } })) ||
          (await Professor.findOne({ where: { email: profile?.email } }));

        if (!userFromDb) {
          return `/login?error=facebookUnauthorized`;
        }
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
