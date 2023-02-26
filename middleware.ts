// middleware.ts
// 放在根路径下面
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 以.开头的符号
const PUBLIC_PATH = /\.(.*)$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/about-2', request.url))
  // 1.上传日志
  if (!PUBLIC_PATH.test(request?.nextUrl?.pathname)) {
    console.log('root')
    // console.log(request.nextUrl.href)
    // console.log(request.referrer)
    // console.log(request.geo)
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: PUBLIC_PATH,
// }
