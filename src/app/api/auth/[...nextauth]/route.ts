import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    pages:{
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "email", type: "email", },
            password: { label: "password", type: "password" },
          },
          async authorize(credentials, req) {
            console.log(credentials);
            if(credentials?.email == 'teste@gmail.com' && credentials?.password == 'teste'){
                return {
                    id: '12',
                    name: 'teste'
                }
            }

            return null;
          }
        })
    ],
})

export { handler as GET, handler as POST }