import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/context/auth-context'
import { CartProvider } from '@/lib/context/cart-context'
import { FavoritesProvider } from '@/lib/context/favorites-context'
import { AdminProvider } from '@/lib/context/admin-context'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tmdt-9evc.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: 'SOLE - Cửa Hàng Giày Cao Cấp',
  description: 'Khám phá những đôi giày sneaker và giày thể thao mới nhất từ các thương hiệu hàng đầu. Mua sắm dễ dàng với nhiều mẫu mã thời trang, chất lượng cao, giá tốt và giao hàng nhanh trên toàn quốc.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://tmdt-9evc.vercel.app/',
    siteName: 'SOLE',
    title: 'SOLE - Cửa Hàng Giày Cao Cấp',
    description: 'Khám phá những đôi giày sneaker và giày thể thao mới nhất từ các thương hiệu hàng đầu.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'SOLE Sneaker Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLE - Cửa Hàng Giày Cao Cấp',
    description: 'Khám phá những đôi giày sneaker và giày thể thao mới nhất từ các thương hiệu hàng đầu.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop'],
    creator: '@sole_store',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <AdminProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                {process.env.NODE_ENV === 'production' && <Analytics />}
              </AdminProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
