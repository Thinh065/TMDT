// Simple script to import lib/data/products.json into MongoDB
// Try to load dotenv if available; otherwise read .env manually.
try {
  require('dotenv').config();
} catch (e) {
  const fs = require('fs');
  const envPath = require('path').join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8');
    raw.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
      if (m) {
        const key = m[1];
        let val = m[2] || '';
        // remove surrounding quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    });
  }
}
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'sole_store';
const COLLECTION = 'products';

async function main() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in environment. Aborting.');
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), 'lib', 'data', 'products.json');
  if (!fs.existsSync(filePath)) {
    console.error('Mock products file not found at', filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(raw);

  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const col = db.collection(COLLECTION);

    let inserted = 0;
    for (const p of products) {
      const filter = { id: p.id };
      const update = { $setOnInsert: p };
      const res = await col.updateOne(filter, update, { upsert: true });
      if (res.upsertedCount === 1) inserted++;
    }

    console.log(`Import complete. ${inserted} new documents inserted (or 0 if all existed).`);
  } catch (err) {
    console.error('Import failed:', err);
    process.exitCode = 2;
  } finally {
    await client.close();
  }
}

main();
