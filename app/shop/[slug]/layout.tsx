import type { Metadata } from 'next';
import { mockProducts } from '@/lib/data/products';
import { formatPrice, productSlug, generateProductDescription } from '@/lib/utils/formatting';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: LayoutProps['params'] }): Promise<Metadata> {
  const { slug } = await params as { slug: string };
  const product = mockProducts.find((p) => productSlug(p.name) === slug);

  if (!product) {
    return {
      title: 'Sản Phẩm Không Tìm Thấy',
      description: 'Sản phẩm không tìm thấy trong cửa hàng',
    };
  }

  const productImage = product.images?.[0] || product.image;
  const description = generateProductDescription(product);

  return {
    title: `${product.name} - SOLE`,
    description,
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: `https://tmdt-9evc.vercel.app/shop/${productSlug(product.name)}`,
      siteName: 'SOLE Shop',
      title: product.name,
      description,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: [productImage],
      creator: '@sole_store',
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
