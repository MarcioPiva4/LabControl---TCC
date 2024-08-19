import { Administrador } from "@/models/Administrador";
import { Professor } from "@/models/Professor";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the default session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    role: string;
  }
}

const handler = NextAuth({
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
      async authorize(credentials, req) {
        const userEmailAdministrador = await Administrador.findOne({
          where: {
            email: credentials?.email,
          },
        }) as any;

        const userPasswordAdministrador = userEmailAdministrador ? await Administrador.findOne({
          where: {
            senha: credentials?.password,
          },
        }) as any : null;

        if (userEmailAdministrador && userPasswordAdministrador) {
          return {
            id: userEmailAdministrador.id,
            name: userEmailAdministrador.nome,
            email: userEmailAdministrador.email,
            role: 'adm',
          };
        }

        const userEmailProfessor = await Professor.findOne({
          where: {
            email: credentials?.email,
          },
        }) as any;

        const userPasswordProfessor = userEmailProfessor ? await Professor.findOne({
          where: {
            senha: credentials?.password,
          },
        }) as any : null;

        if (userEmailProfessor && userPasswordProfessor) {
          return {
            id: userEmailProfessor.id,
            name: userEmailProfessor.nome,
            email: userEmailProfessor.email,
            role: 'prof',
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
