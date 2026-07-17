import type { Metadata } from 'next'
import Script from 'next/script'
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
  generator: 'SOLE',
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
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.GA_MEASUREMENT_ID

  return (
    <html lang="vi" className="dark">
      <head>
        <meta name="google-site-verification" content="cR1vzM2PWp9rwnhTUj7_MgKc5y0nbvo8aUDIiF4gT7w" />
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        <Script
          strategy="afterInteractive"
          src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
        />
        <script defer src="https://app.fastbots.ai/embed.js" data-bot-id="cmrmy7tbd06boqk1okbomu05y"></script>
        <Script
          id="fastbots-resize"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const fastBotsResize = () => {
                const selectors = [
                  'iframe[src*="fastbots.ai"]',
                  'iframe[src*="fastbots"]',
                  'div[id*="fastbots"]',
                  'div[class*="fastbots"]',
                  '[data-bot-id="cmrmy7tbd06boqk1okbomu05y"]'
                ];
                const applyStyle = (el) => {
                  if (!el || !el.style) return;
                  el.style.position = 'fixed';
                  el.style.bottom = '24px';
                  el.style.right = '100px';
                  el.style.left = 'auto';
                  el.style.width = '320px';
                  el.style.maxWidth = '320px';
                  el.style.minWidth = 'auto';
                  el.style.height = '460px';
                  el.style.maxHeight = '460px';
                  el.style.minHeight = 'auto';
                  el.style.transform = 'none';
                  el.style.margin = '0';
                  el.style.padding = '0';
                };
                document.querySelectorAll(selectors.join(',')).forEach(applyStyle);
              };
              const observer = new MutationObserver(fastBotsResize);
              observer.observe(document.body, { childList: true, subtree: true });
              window.addEventListener('load', fastBotsResize);
              fastBotsResize();
            `,
          }}
        />
      </head>
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
