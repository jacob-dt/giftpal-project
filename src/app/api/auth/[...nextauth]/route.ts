import NextAuth from "next-auth";

import { authorizationOptions } from "@/lib/authorizationOptions";

const handler = NextAuth(authorizationOptions);

export { handler as GET, handler as POST };
