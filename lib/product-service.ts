import { ObjectId } from 'mongodb';
import { Product } from './types/product';
import { getDatabase } from './mongodb';
import { mockProducts } from './data/products';

const COLLECTION_NAME = 'products';

async function seedProductsIfNeeded(collection: Awaited<ReturnType<typeof getDatabase>>['collection']) {
  const count = await collection.estimatedDocumentCount();
  if (count === 0) {
    await collection.insertMany(
      mockProducts.map((product) => ({
        ...product,
        id: product.id,
      }))
    );
  }
}

async function getProductCollection() {
  if (process.env.USE_MOCK_DATA === 'true') {
    return null;
  }

  try {
    const db = await getDatabase();
    return db.collection(COLLECTION_NAME);
  } catch (error) {
    console.warn('MongoDB is unavailable. Using mock product data instead.', error);
    return null;
  }
}

function toProduct(doc: any): Product {
  return {
    id: String(doc.id ?? doc._id ?? new ObjectId()),
    name: doc.name,
    brand: doc.brand,
    price: doc.price,
    originalPrice: doc.originalPrice,
    image: doc.image,
    images: doc.images,
    description: doc.description,
    material: doc.material,
    category: doc.category,
    sizes: doc.sizes,
    colors: doc.colors,
    rating: doc.rating,
    reviewCount: doc.reviewCount,
    inStock: doc.inStock,
    stockCount: doc.stockCount,
    releaseDate: doc.releaseDate,
    featured: doc.featured,
  };
}

export async function getProducts(): Promise<Product[]> {
  const collection = await getProductCollection();
  if (!collection) {
    return mockProducts.map((product) => ({ ...product }));
  }

  await seedProductsIfNeeded(collection);
  const docs = await collection.find().toArray();
  return docs.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const collection = await getProductCollection();
  if (!collection) {
    return mockProducts.find((product) => product.id === id) ?? null;
  }

  const doc = await collection.findOne({ id });
  return doc ? toProduct(doc) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const collection = await getProductCollection();
  if (!collection) {
    return mockProducts.find((product) => {
      const name = product.name || '';
      return name
        .normalize('NFKD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^A-Za-z0-9]/g, '') === slug;
    }) ?? null;
  }

  const docs = await collection.find().toArray();
  const doc = docs.find((item) => {
    const name = item.name || '';
    return name
      .normalize('NFKD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^A-Za-z0-9]/g, '') === slug;
  });
  return doc ? toProduct(doc) : null;
}

export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  const collection = await getProductCollection();
  if (!collection) {
    const product: Product = {
      ...productData,
      id: `product-${Date.now()}`,
    };
    return product;
  }

  const product: Product = {
    ...productData,
    id: `product-${Date.now()}`,
  };
  await collection.insertOne(product);
  return product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const collection = await getProductCollection();
  if (!collection) {
    const existingProduct = mockProducts.find((product) => product.id === id);
    if (!existingProduct) {
      return null;
    }

    return { ...existingProduct, ...updates };
  }

  const updatedDoc = await collection.findOneAndUpdate(
    { id },
    { $set: updates },
    { returnDocument: 'after' }
  );

  if (!updatedDoc.value) {
    return null;
  }

  return toProduct(updatedDoc.value);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const collection = await getProductCollection();
  if (!collection) {
    return mockProducts.some((product) => product.id === id);
  }

  const result = await collection.deleteOne({ id });
  return result.deletedCount === 1;
}
