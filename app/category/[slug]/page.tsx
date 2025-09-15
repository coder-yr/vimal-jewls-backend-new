"use client";

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ProductImage {
  alt: string;
  src: string;
}

interface Product {
  id: number;
  name: string;
  images: ProductImage[];
  description: string;
  price: number;
  mrp: number;
  slug: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params === "object" && params !== null ? (params as any).slug : undefined;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:7502/api/categories/${slug}`);
        if (!res.ok) {
          setCategory(null);
          setProducts([]);
        } else {
          const data = await res.json();
          setCategory(data.category);
          setProducts(data.products);
        }
      } catch (err) {
        setCategory(null);
        setProducts([]);
      }
      setLoading(false);
    }
    if (slug) fetchData();
  }, [slug]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!category) {
    return <div className="text-center py-10">Category not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Banner placeholder (add if you have banner data in backend) */}
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4 md:px-8 text-sm text-gray-600">
        <span>Home</span> / <span>Jewellery</span> / <span className="font-semibold capitalize">{category.name}</span>
      </div>

      {/* Tabs */}
      <div className="bg-white py-4 px-4 md:px-8 border-b border-gray-200 flex gap-4 overflow-x-auto">
        <button className="bg-[#009999] text-white px-6 py-2 rounded-full">All</button>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full bg-transparent">In Stock</button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Sidebar - Filters (not implemented, backend does not provide filters) */}
        <aside className="w-full lg:w-72 p-4 md:p-8 border-r border-gray-200 bg-white lg:h-[calc(100vh-150px)] lg:overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">FILTERS</h2>
            <span className="text-lg font-bold text-[#009999]">0</span>
          </div>
          <strong role="heading" aria-level={2} className="block-subtitle filter-subtitle mb-4">Shopping Options</strong>
          <div className="text-gray-500">No filters available for this category.</div>
        </aside>

        {/* Right Content - Product Grid */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          <div className="flex justify-end items-center mb-6">
            <span className="text-gray-700 mr-2">Sort By:</span>
            <select className="w-[180px] rounded-md border border-gray-300 bg-white">
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">No products found for this category.</div>
            ) : (
              <>
                {products.map((product) => {
                  // Placeholder values for badge, discount, rating, and reviews
                  const badge = product.badgeTag || "BESTSELLER"; // Use product.badgeTag if available
                  const badgeColor = badge === "TRENDING" ? "bg-pink-500" : "bg-purple-600";
                  const discount = product.mrp && product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
                  const rating = product.rating || 4.9; // Use product.rating if available
                  const reviews = product.reviews || 50; // Use product.reviews if available
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden relative group"
                    >
                      {/* Badge */}
                      <div className={`absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white rounded-br-lg ${badgeColor}`}>
                        {badge}
                      </div>
                      {/* Wishlist Button */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="bg-white rounded-full shadow-md p-2"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id.toString());
                          }}
                        >
                          <span className={`w-5 h-5 inline-block ${wishlist.includes(product.id.toString()) ? "text-red-500" : "text-gray-700"}`}>♥</span>
                        </button>
                      </div>
                      {/* Product Image */}
                      <Image
                        src={product.images?.[0]?.src || "/placeholder.jpg"}
                        alt={product.images?.[0]?.alt || product.name}
                        width={250}
                        height={250}
                        className="w-full h-60 object-contain p-4"
                      />
                      <div className="p-4">
                        {/* Price, MRP, Discount */}
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xl font-bold text-[#009999]">₹{product.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-500 line-through">₹{product.mrp?.toLocaleString()}</div>
                        </div>
                        <div className="text-green-600 text-sm font-semibold mb-1">{discount > 0 ? `${discount}% Off` : ""}</div>
                        {/* Product Name */}
                        <h3 className="text-base font-medium text-gray-800 mb-1">{product.name}</h3>
                        {/* Star Rating and Reviews */}
                        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
                          <span>★</span>
                          <span className="font-semibold">{rating}</span>
                          <span className="text-gray-600">({reviews})</span>
                        </div>
                        {/* Description */}
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
