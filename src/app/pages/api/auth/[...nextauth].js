import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const users = [
  { id: 1, name: "Yell Htut", username: "yellhtut", email: "yellhtut4@gmail.com", password: "admin123" },
  { id: 2, name: "Tun Min", username: "tunmin", email: "tunmin4@gmail.com", password: "admin123" },
];
console.log(process.env.JWT_SECRET);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        console.log('Found user:', user);

        if (user) {
          // Successful login, return user object with ID and email
          return { id: user.id, name: user.name, email: user.email };
        }
        // If no user is found, return null
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt", // Use JWT strategy
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'ONY6OI7fmNVUe4LZmBl0Z3ZEdzSHX0um9OeWkV', // Change this to a secure secret
    // encode: async ({ token }) => {
    //   return jwt.sign(token, process.env.JWT_SECRET, {
    //     algorithm: "HS256",
    //   });
    // },
    // decode: async ({ token }) => {
    //   return jwt.verify(token, process.env.JWT_SECRET, {
    //     algorithms: ["HS256"],
    //   });
    // },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
        secure: process.env.NODE_ENV === 'production',
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       // secure: process.env.NODE_ENV === "production", // Only secure in production
  //     },
  //   },
  // },
  debug: true, // Add this line
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Error page
    // signOut: "/auth/signout" // Sign-out page
  },
});
