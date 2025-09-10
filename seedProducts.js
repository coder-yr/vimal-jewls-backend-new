import db from './services/backend/db.js';
import products from './modules/mockData/products.js';

async function seedProducts() {
  try {
  await db.sequelize.sync(); // Ensure tables exist
  const productsWithStringifiedImages = products.map(product => ({
    ...product,
    images: JSON.stringify(product.images),
    price: product.currentPrice ? Number(String(product.currentPrice).replace(/,/g, "")) : (product.price ? Number(product.price) : 0),
    mrp: product.originalPrice ? Number(String(product.originalPrice).replace(/,/g, "")) : (product.mrp ? Number(product.mrp) : 0)
  }));
  await db.products.bulkCreate(productsWithStringifiedImages, { updateOnDuplicate: ["slug", "price", "mrp"] });
    console.log('Products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
