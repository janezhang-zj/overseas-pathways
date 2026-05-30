import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PAYWALL_ACTIVE } from "@/lib/paywall-config";

export function middleware(request: NextRequest) {
  if (!PAYWALL_ACTIVE) return NextResponse.next();

  // 收费模式：保护路径详情页
  const isDetailPage =
    request.nextUrl.pathname.startsWith("/pathways/") &&
    request.nextUrl.pathname !== "/pathways/";

  if (isDetailPage && !request.cookies.get("pw_access")?.value) {
    return NextResponse.redirect(new URL("/unlock", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|images|fonts|favicon|robots|sitemap).*)"],
};
