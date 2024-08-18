import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });

    if(!token){
        return NextResponse.redirect(new URL('/login', req.url));
    }

   return NextResponse.next();
}

export const config = {
    matcher: ['/', '/cadastro/:path*',],
};
