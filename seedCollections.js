import db from './services/backend/db.js';
import collections from './modules/mockData/collections.js';

async function seedCollections() {
  try {
    await db.sequelize.sync(); // Ensure tables exist
    await db.collections.bulkCreate(collections, { ignoreDuplicates: true });
    console.log('Collections seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding collections:', error);
    process.exit(1);
  }
}

seedCollections();
