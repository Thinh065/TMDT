import Link from 'next/link';
import { use } from 'react';
import type { Metadata } from 'next';
import { mockBlogPosts } from '@/lib/data/blog-posts';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { formatDate } from '@/lib/utils/formatting';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Bài Viết Không Tìm Thấy',
      description: 'Bài viết blog không tìm thấy',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      url: `https://tmdt-9evc.vercel.app/blog/${post.slug}`,
      siteName: 'SOLE Blog',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      creator: '@sole_store',
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Bài Viết Không Tìm Thấy</h1>
          <Link href="/blog">
            <Button>Quay Lại Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    articleBody: post.content,
    keywords: post.tags.join(','),
    mainEntity: {
      '@type': 'Article',
      headline: post.title,
      articleBody: post.content,
    },
  };

  return (
    <article className="min-h-screen bg-background">
      <script
        id={`blog-post-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang Chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link href="/blog" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Quay Lại Blog
        </Link>
      </div>

      {/* Featured Image */}
      <div className="w-full h-96 overflow-hidden bg-secondary">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Title and Meta */}
        <div className="space-y-4">
          <div>
            <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">{post.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <span className="text-sm">5 phút đọc</span>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none">
          <div className="text-foreground leading-relaxed whitespace-pre-wrap space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground">
                    {paragraph
                      .split('\n')
                      .map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {paragraph
                      .split('\n')
                      .map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-border space-y-4">
          <p className="text-sm font-semibold text-foreground">Thẻ</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-secondary border border-border px-3 py-1 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Bài Viết Liên Quan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group bg-background border border-border rounded-lg overflow-hidden hover:border-accent transition-all"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <div className="p-4 space-y-3">
                    <Link href={`/blog/${relatedPost.slug}`} className="group/title">
                      <h3 className="font-bold text-foreground group-hover/title:text-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{formatDate(relatedPost.createdAt)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
