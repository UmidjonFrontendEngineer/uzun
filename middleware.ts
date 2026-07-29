import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['uz', 'en', 'ru'] as const;
const defaultLocale = 'uz';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        const currentLocale = pathname.split('/')[1];
        const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
        
        const response = NextResponse.next();
        
        // Agar URL'dagi til cookie'dagidan farq qilsa, cookie'ni yangilab qo'yamiz
        if (cookieLocale !== currentLocale) {
            response.cookies.set('NEXT_LOCALE', currentLocale, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
            });
        }

        return response;
    }

    // Agar foydalanuvchi til ko'rsatmasdan (masalan / ga) kelsa:
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    
    // Cookie'da qaysi til saqlangan bo'lsa, o'sha bilan davom etamiz (agar mavjud bo'lmasa default)
    const locale = cookieLocale && locales.includes(cookieLocale as any) ? cookieLocale : defaultLocale;

    return NextResponse.redirect(
        new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};