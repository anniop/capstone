import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",                   // 👈 now homepage is public too
    "/api/webhooks/clerk",  // 👈 webhook is public
  ],
});

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
