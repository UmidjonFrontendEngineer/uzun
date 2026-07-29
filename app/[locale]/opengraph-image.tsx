import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function generateStaticParams() {
    const locales = ['uz', 'ru', 'en'];
    return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: { locale: string } }) {
    const { locale } = params;

    const title =
        locale === 'uz' ? 'Uzun Market - Onlayn savdo' :
            locale === 'ru' ? 'Uzun Market - Онлайн маркетплейс' :
                'Uzun Market - Online Marketplace';

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    color: 'white',
                    background: 'linear-gradient(to right, #7e22ce, #4f46e5)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}