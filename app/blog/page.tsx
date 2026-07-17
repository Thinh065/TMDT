import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';
import { mockBlogPosts } from '@/lib/data/blog-posts';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/formatting';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog SOLE - Tin Tức & Hướng Dẫn Về Sneaker',
  description: 'Thông tin chi tiết, hướng dẫn và tin tức về sneaker, chạy bộ và văn hóa sneaker.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://tmdt-9evc.vercel.app/blog',
    siteName: 'SOLE Blog',
    title: 'Blog SOLE - Tin Tức & Hướng Dẫn Về Sneaker',
    description: 'Thông tin chi tiết, hướng dẫn và tin tức về sneaker, chạy bộ và văn hóa sneaker.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'SOLE Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog SOLE - Tin Tức & Hướng Dẫn Về Sneaker',
    description: 'Thông tin chi tiết, hướng dẫn và tin tức về sneaker, chạy bộ và văn hóa sneaker.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=630&fit=crop'],
  },
};

export default function BlogPage() {
  const publishedPosts = mockBlogPosts.filter((post) => post.published);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog SOLE',
    description: 'Thông tin chi tiết, hướng dẫn và tin tức về sneaker, chạy bộ và văn hóa sneaker.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: publishedPosts.map((post, index) => ({
        '@type': 'BlogPosting',
        position: index + 1,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="blog-collection-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-accent font-semibold uppercase tracking-widest">Văn Hóa Sneaker</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white">Blog SOLE</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thông tin chi tiết, hướng dẫn và tin tức về sneaker, chạy bộ và văn hóa sneaker.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all hover:shadow-lg"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-accent/90 px-3 py-1 rounded-full text-xs font-semibold text-black">
                      {post.category}
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2">
                      {post.author}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="group/title">
                      <h2 className="text-xl font-bold text-foreground group-hover/title:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 text-sm">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                        Đọc Thêm
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
