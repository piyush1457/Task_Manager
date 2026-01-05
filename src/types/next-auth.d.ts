import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            age?: number;
            phone?: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        age?: number;
        phone?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        age?: number;
        phone?: string;
    }
}
