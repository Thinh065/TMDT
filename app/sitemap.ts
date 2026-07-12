import type { MetadataRoute } from 'next'
import { mockBlogPosts } from '@/lib/data/blog-posts'
import { mockProducts } from '@/lib/data/products'
import { productSlug } from '@/lib/utils/formatting'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tmdt-9evc.vercel.app'
  const currentDate = new Date().toISOString().split('T')[0]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/register`,
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.5,
    },
  ]

  // Dynamic blog posts
  const blogPages: MetadataRoute.Sitemap = mockBlogPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Dynamic products
  const productPages: MetadataRoute.Sitemap = mockProducts
    .filter((product) => product.featured)
    .map((product) => ({
      url: `${baseUrl}/shop/${productSlug(product.name)}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/shop?category=running`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop?category=basketball`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop?category=casual`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop?category=lifestyle`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return [...staticPages, ...blogPages, ...productPages, ...categoryPages]
}
