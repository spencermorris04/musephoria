import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const handler = NextAuth(authOptions);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export { handler as GET, handler as POST };