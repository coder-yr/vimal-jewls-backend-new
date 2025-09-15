import db from './services/backend/db.js';

const seedBanners = async () => {
  try {
    await db.sequelize.sync(); // Ensure the database is synced

    await db.banners.bulkCreate([
      {
        image: "https://www.candere.com/media/catalog/category/Earrings-Listing-Page-Banner.jpg",
        url: "/category/earrings",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Ring-Listing-Page-Banner.jpg",
        url: "/category/rings",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Necklace-Listing-Page-Banner.jpg",
        url: "/category/necklace",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Bracelets-Listing-Page-Banner.jpg",
        url: "/category/bangles-bracelets",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Solitaire-LP_2.jpg",
        url: "/category/solitaires",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/LP-Bestseller_1_.jpg",
        url: "/category/mangalsutras-pendants",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Exchange-PLP.jpg",
        url: "/category/other-jewellery",
        active: true,
      },
      {
        image: "https://www.candere.com/media/catalog/category/Gifting-Desktop.jpg",
        url: "/category/gifts",
        active: true,
      },
    ]);

    console.log("Banners seeded successfully.");
  } catch (error) {
    console.error("Error seeding banners:", error);
  }
};

seedBanners();