import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    const token = await getToken({ req, secret });

    if(!token){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.nextUrl.pathname.startsWith("/api/socket")) {
        return NextResponse.next(); 
    }

   return NextResponse.next();
}

export const config = {
    matcher: ['/', '/cadastro/:path*', '/manutencao/:path*', '/log', '/baixa-aulas/:path*', '/itens/:path*', '/api/:path*'],
};
