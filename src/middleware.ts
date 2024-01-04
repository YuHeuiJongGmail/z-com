import { auth } from "./auth";
import { NextResponse } from "next/server";

//@/auth.ts 의 callback async authorized()와 같은 역할을 함.
export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login"); //프론트의 포트번호를 바꾼다.
    // return NextResponse.redirect("http://localhost:80/i/flow/login");   //프론트의 포트번호를 바꾼다.
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
