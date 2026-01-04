import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Защищаем админ роуты
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin-session")

    // Если нет сессии и это не страница логина
    if (!sessionCookie && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Если есть сессия и пытается зайти на страницу логина
    if (sessionCookie && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
