import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: { label: "name" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignup: { label: "signup", type: "boolean" }
      },
     async authorize(credentials) {
  if (!credentials) return null;

  const name = String(credentials.name ?? "");
  const email = String(credentials.email ?? "");
  const password = String(credentials.password ?? "");
  const isSignup = credentials.isSignup === "true" || credentials.isSignup === true;

  if (!email || !password) return null;

  if (isSignup) {
    return {
      id: "1",
      name,
      email,
    };
  }

  return {
    id: "2",
    name,
    email,
  };
},
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});