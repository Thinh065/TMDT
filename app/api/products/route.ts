import { NextResponse } from 'next/server';
import { createProduct, getProducts } from '@/lib/product-service';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Unable to load products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['name', 'brand', 'price', 'image', 'description', 'material', 'category', 'sizes', 'colors', 'stockCount', 'inStock'];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const product = await createProduct({
      ...body,
      rating: body.rating ?? 0,
      reviewCount: body.reviewCount ?? 0,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Unable to create product' }, { status: 500 });
  }
}
