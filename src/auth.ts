import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createConnection, executeQuery } from "@/utils/mysql";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(c) {
        const connection = await createConnection();
        const login = c.login as string;
        const password = c.password as string;
        const res = await executeQuery<User[], string[]>(
          connection,
          "SELECT * from Users WHERE login = ? AND password = ?",
          [login, password]
        );

        if (res.length === 1) {
          return { name: login, id: `${res[0].id}` };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "UPO4cnmmWXPiMWac0Pv/yQqf2fPVm/nPWTWDtgEl0bc=",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }): Promise<any> {
      return baseUrl;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
