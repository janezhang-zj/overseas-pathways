import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ★ 暂时免费——面包多审核通过后，取消下面两行的注释即可恢复付费墙：
  // const isDetailPage = request.nextUrl.pathname.startsWith("/pathways/") && request.nextUrl.pathname !== "/pathways/";
  // if (isDetailPage && !request.cookies.get("pw_access")?.value) { return NextResponse.redirect(new URL("/unlock", request.url)); }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|images|fonts|favicon|robots|sitemap).*)"],
};
