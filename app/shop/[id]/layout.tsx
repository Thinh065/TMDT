import type { Metadata } from 'next';
import { mockProducts } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatting';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: LayoutProps['params'] }): Promise<Metadata> {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: 'Sản Phẩm Không Tìm Thấy',
      description: 'Sản phẩm không tìm thấy trong cửa hàng',
    };
  }

  const productImage = product.images?.[0] || product.image;

  return {
    title: `${product.name} - SOLE`,
    description: product.description,
    openGraph: {
      type: 'product',
      locale: 'vi_VN',
      url: `https://tmdt-9evc.vercel.app/shop/${product.id}`,
      siteName: 'SOLE Shop',
      title: product.name,
      description: product.description,
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
      description: product.description,
      images: [productImage],
      creator: '@sole_store',
    },
  };
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>;
}
