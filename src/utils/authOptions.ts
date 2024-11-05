import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Administrador } from "@/models/Administrador";
import { Professor } from "@/models/Professor";

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

          await Administrador.increment('loginCount', { by: 1, where: { id: userEmailAdministrador.id } });

          return {
            id: userEmailAdministrador.id,
            name: userEmailAdministrador.nome,
            email: userEmailAdministrador.email,
            role: 'adm',
            isFirstLogin: isFirstLogin, 
          };
        }

        const userEmailProfessor = await Professor.findOne({
          where: { email: credentials?.email },
        }) as any;

        if (userEmailProfessor && userEmailProfessor.senha == credentials?.password) {
          const isFirstLogin = userEmailProfessor.loginCount === 0;

          await Professor.increment('loginCount', { by: 1, where: { id: userEmailProfessor.id } });

          return {
            id: userEmailProfessor.id,
            name: userEmailProfessor.nome,
            email: userEmailProfessor.email,
            role: 'prof',
            isFirstLogin: isFirstLogin,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isFirstLogin = user.isFirstLogin; 
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isFirstLogin = token.isFirstLogin as boolean;
      }
      return session;
    },
  },
};
