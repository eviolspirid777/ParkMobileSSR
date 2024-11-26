// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const {pathname} = req.nextUrl;

//   console.log(pathname)
//   if(pathname.startsWith("/test-path")) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/new-path"
//     return NextResponse.redirect(url);
//   }

//   if (pathname.startsWith('/api')) {
//     const url = req.nextUrl.clone();

//     url.pathname = '/my-proxy' + pathname; // Это должен быть корректный путь к твоему обработчику
//     return NextResponse.rewrite(url);
//   }  

//   return NextResponse.next();
// }