import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    usuario: {
      id: number;
      email: string;
      nome: string;
    };
  }
}