import { ObjectId } from 'mongodb';
import { Product } from './types/product';
import { getDatabase } from './mongodb';
import { mockProducts as initialMockProducts } from './data/products';
import fs from 'fs/promises';
import path from 'path';

const COLLECTION_NAME = 'products';

async function seedProductsIfNeeded(collection: Awaited<ReturnType<typeof getDatabase>>['collection']) {
  const count = await collection.estimatedDocumentCount();
  if (count === 0) {
    await collection.insertMany(
      initialMockProducts.map((product) => ({
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

  const db = await getDatabase();
  if (!db) {
    return null;
  }

  return db.collection(COLLECTION_NAME);
}

const mockFilePath = path.join(process.cwd(), 'lib', 'data', 'products.json');

async function readMockProductsFromFile(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(mockFilePath, 'utf-8');
    const data = JSON.parse(raw) as Product[];
    return data;
  } catch (err) {
    // If file doesn't exist, seed it from initialMockProducts
    await fs.mkdir(path.dirname(mockFilePath), { recursive: true }).catch(() => {});
    await fs.writeFile(mockFilePath, JSON.stringify(initialMockProducts, null, 2), 'utf-8');
    return initialMockProducts.slice();
  }
}

async function writeMockProductsToFile(products: Product[]) {
  await fs.writeFile(mockFilePath, JSON.stringify(products, null, 2), 'utf-8');
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
    return await readMockProductsFromFile();
  }

  await seedProductsIfNeeded(collection);
  const docs = await collection.find().toArray();
  return docs.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const collection = await getProductCollection();
  if (!collection) {
    const mocks = await readMockProductsFromFile();
    return mocks.find((product) => product.id === id) ?? null;
  }

  const doc = await collection.findOne({ id });
  return doc ? toProduct(doc) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const collection = await getProductCollection();
  if (!collection) {
    const mocks = await readMockProductsFromFile();
    return (
      mocks.find((product) => {
        const name = product.name || '';
        return name
          .normalize('NFKD')
          .replace(/\p{Diacritic}/gu, '')
          .replace(/[^A-Za-z0-9]/g, '') === slug;
      }) ?? null
    );
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
    const mocks = await readMockProductsFromFile();
    mocks.push(product);
    await writeMockProductsToFile(mocks);
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
    const mocks = await readMockProductsFromFile();
    const index = mocks.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
    mocks[index] = { ...mocks[index], ...updates } as Product;
    await writeMockProductsToFile(mocks);
    return mocks[index];
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
    const mocks = await readMockProductsFromFile();
    const index = mocks.findIndex((p) => p.id === id);
    if (index === -1) return false;
    mocks.splice(index, 1);
    await writeMockProductsToFile(mocks);
    return true;
  }

  const result = await collection.deleteOne({ id });
  return result.deletedCount === 1;
}
