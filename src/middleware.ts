import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/addBook")) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (!req.auth && req.nextUrl.pathname.startsWith("/addReview")) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
