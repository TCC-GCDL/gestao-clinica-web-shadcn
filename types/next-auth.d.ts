import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    expires_at: string;
    usuario: {
      id: number;
      email: string;
      nome: string;
    };
  }
}