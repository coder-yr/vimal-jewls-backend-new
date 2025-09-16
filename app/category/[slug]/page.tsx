"use client";

"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const FilterSidebar = dynamic(() => import("@/components/FilterSidebar"), { ssr: false });
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
  // Filter state
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Build query params for filters
        const params = new URLSearchParams();
        if (selectedPrices.length > 0) params.append('price', selectedPrices.join(','));
        if (selectedMaterials.length > 0) params.append('material', selectedMaterials.join(','));
        if (selectedStyles.length > 0) params.append('style', selectedStyles.join(','));
        const url = `http://localhost:7502/api/categories/${slug}?${params.toString()}`;
        const res = await fetch(url);
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
  }, [slug, selectedPrices, selectedMaterials, selectedStyles]);

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
        {/* Left Sidebar - Filters */}
        <FilterSidebar
          filters={
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">FILTERS</h2>
              </div>
              <strong role="heading" aria-level={2} className="block-subtitle filter-subtitle mb-4">Shopping Options</strong>
              {/* Filter: Price Range */}
              <div className="mb-6">
                <div className="font-semibold mb-2">Price</div>
                <div className="flex flex-col gap-2">
                  <label><input type="checkbox" value="under-5000" checked={selectedPrices.includes('under-5000')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedPrices(prev => checked ? [...prev, 'under-5000'] : prev.filter(v => v !== 'under-5000'));
                  }} /> Under ₹5,000</label>
                  <label><input type="checkbox" value="5000-10000" checked={selectedPrices.includes('5000-10000')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedPrices(prev => checked ? [...prev, '5000-10000'] : prev.filter(v => v !== '5000-10000'));
                  }} /> ₹5,000 - ₹10,000</label>
                  <label><input type="checkbox" value="10000-20000" checked={selectedPrices.includes('10000-20000')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedPrices(prev => checked ? [...prev, '10000-20000'] : prev.filter(v => v !== '10000-20000'));
                  }} /> ₹10,000 - ₹20,000</label>
                  <label><input type="checkbox" value="above-20000" checked={selectedPrices.includes('above-20000')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedPrices(prev => checked ? [...prev, 'above-20000'] : prev.filter(v => v !== 'above-20000'));
                  }} /> Above ₹20,000</label>
                </div>
              </div>
              {/* Filter: Material */}
              <div className="mb-6">
                <div className="font-semibold mb-2">Material</div>
                <div className="flex flex-col gap-2">
                  <label><input type="checkbox" value="gold" checked={selectedMaterials.includes('gold')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedMaterials(prev => checked ? [...prev, 'gold'] : prev.filter(v => v !== 'gold'));
                  }} /> Gold</label>
                  <label><input type="checkbox" value="silver" checked={selectedMaterials.includes('silver')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedMaterials(prev => checked ? [...prev, 'silver'] : prev.filter(v => v !== 'silver'));
                  }} /> Silver</label>
                  <label><input type="checkbox" value="diamond" checked={selectedMaterials.includes('diamond')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedMaterials(prev => checked ? [...prev, 'diamond'] : prev.filter(v => v !== 'diamond'));
                  }} /> Diamond</label>
                </div>
              </div>
              {/* Filter: Style */}
              <div className="mb-6">
                <div className="font-semibold mb-2">Style</div>
                <div className="flex flex-col gap-2">
                  <label><input type="checkbox" value="traditional" checked={selectedStyles.includes('traditional')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedStyles(prev => checked ? [...prev, 'traditional'] : prev.filter(v => v !== 'traditional'));
                  }} /> Traditional</label>
                  <label><input type="checkbox" value="modern" checked={selectedStyles.includes('modern')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedStyles(prev => checked ? [...prev, 'modern'] : prev.filter(v => v !== 'modern'));
                  }} /> Modern</label>
                  <label><input type="checkbox" value="casual" checked={selectedStyles.includes('casual')} onChange={e => {
                    const checked = e.target.checked;
                    setSelectedStyles(prev => checked ? [...prev, 'casual'] : prev.filter(v => v !== 'casual'));
                  }} /> Casual</label>
                </div>
              </div>
            </>
          }
        />

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
