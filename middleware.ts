import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  if(pathname.startsWith("/test-path")) {
    const url = req.nextUrl.clone();
    url.pathname = "/new-path"
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/api')) {
    const url = req.nextUrl.clone();
    url.pathname = '/my-proxy' + pathname; // Обрабатываем путь как прокси
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}