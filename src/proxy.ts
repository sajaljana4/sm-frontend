import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "./utils/cookie-storage";

export const publicPaths = ["/", "/auth/register"];

export const authorizedPaths = [
  "/dashboard",
  "/auth/verification-pending",
  "/my/interests",
  "/my/interests/history",
  "/my/shortlists",
  "/my/profile",
];

const matchDynamicRoute = ({
  pathname,
  ifTokenNotExist,
}: {
  pathname: string;
  ifTokenNotExist: boolean;
}): boolean => {
  if (pathname.startsWith("/auth")) {
    return ifTokenNotExist;
  }
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    return !ifTokenNotExist;
  }
  return false;
};

export async function proxy(request: NextRequest) {
  const token = await getAuthToken();
  const ifTokenNotExist = token === "" || token === undefined || token === null;

  const url = new URL(request.nextUrl.href);
  const pathname = url.pathname;

  if (
    publicPaths.includes(pathname) ||
    matchDynamicRoute({ pathname, ifTokenNotExist })
  ) {
    return NextResponse.next();
  }

  if (pathname === authorizedPaths.find((path) => path === pathname)) {
    if (ifTokenNotExist)
      return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
