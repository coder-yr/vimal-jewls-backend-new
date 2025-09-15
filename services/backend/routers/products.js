import express from "express";
const router = express.Router();
import db from "../db.js";

// GET /api/products - List all products
router.get("/", async (req, res) => {
  const products = await db.products.findAll();
  res.json(products);
});

// GET /api/products/slug/:slug - Get product details by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await db.products.findOne({
      where: { slug: req.params.slug },
      raw: false // Get Sequelize instance
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        slug: req.params.slug
      });
    }

    // Convert to plain object
    let productData = product.toJSON();

    // Handle images
    try {
      let parsedImages = [];
      
      if (productData.images) {
        if (typeof productData.images === 'string') {
          parsedImages = JSON.parse(productData.images);
        } else {
          parsedImages = productData.images;
        }
        
        // Ensure images is always an array of objects with src and alt
        if (Array.isArray(parsedImages)) {
          productData.images = parsedImages.map(img => {
            if (typeof img === 'string') {
              return { src: img, alt: productData.name || "Product Image" };
            }
            return {
              src: img.src || "/placeholder.jpg",
              alt: img.alt || productData.name || "Product Image"
            };
          });
        } else if (parsedImages && typeof parsedImages === 'object') {
          productData.images = [{
            src: parsedImages.src || "/placeholder.jpg",
            alt: parsedImages.alt || productData.name || "Product Image"
          }];
        } else {
          throw new Error('Invalid image data');
        }
      } else {
        productData.images = [{
          src: "/placeholder.jpg",
          alt: productData.name || "Product Image"
        }];
      }
    } catch (err) {
      console.error('Error parsing product images:', err);
      productData.images = [{
        src: "/placeholder.jpg",
        alt: productData.name || "Product Image"
      }];
    }

    // Add empty arrays and default values for fields that might be undefined
    productData.youMayAlsoLike = [];
    productData.includedWithPurchase = [];
    productData.badges = [];
    productData.reviews = [];
    productData.priceBreakup = [];
    productData.currentPrice = String(productData.price || "0");
    productData.originalPrice = String(productData.mrp || "0");
    
    res.json(productData);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message
    });
  }
});

// POST /api/products - Add new product
router.post("/", async (req, res) => {
  const newProduct = await db.products.create(req.body);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update product
router.put("/:id", async (req, res) => {
  const updated = await db.products.update(req.body, { where: { id: req.params.id } });
  res.json(updated);
});

// DELETE /api/products/:id - Delete product
router.delete("/:id", async (req, res) => {
  await db.products.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

export default router;
