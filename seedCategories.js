import db from './services/backend/db.js';
import categories from './modules/mockData/categories.js';

async function seedCategories() {
  try {
    await db.sequelize.sync(); // Ensure tables exist
    await db.categories.bulkCreate(categories, { ignoreDuplicates: true });
    console.log('Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
