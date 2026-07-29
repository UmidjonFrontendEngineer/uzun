import { ImageResponse } from 'next/og';

export default async function Image() {
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
                Uzun.uz — Milliy marketpleks
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}