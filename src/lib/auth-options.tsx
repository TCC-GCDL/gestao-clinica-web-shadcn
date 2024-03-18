import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        CredentialsProvider({
            id: "auth-spring",
            name: "credentials",
            credentials: {
              email: { label: "email", type: "email", placeholder: "example@gmail.com" },
              password: { label: "password", type: "password" },
            },
            async authorize(credentials, req) {
              const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
              })
      
              const user = await response.json();
              
              if (user) {
      
                return user;

              } else {

                return null;      

              }
            },
          }),
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
};
