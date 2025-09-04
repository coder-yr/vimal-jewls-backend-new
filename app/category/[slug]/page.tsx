"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, PlayCircle, Star, TrendingUp, Crown, Clock } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react" // Removed 'use' import
import { useParams } from "next/navigation"

// Dummy data for demonstration
const productCategories = {
  earrings: {
    name: "Earrings",
    filters: [
      {
        id: "gemstone-type",
        name: "Gemstone Type",
        type: "radio",
        options: [
          { label: "Fancy Gemstone", value: "fancy-gemstone", count: 241 },
          { label: "Opal", value: "opal", count: 1 },
        ],
        initialVisible: 2, // All visible
      },
      {
        id: "in-stock",
        name: "In Stock",
        type: "checkbox",
        options: [{ label: "In-Stock", value: "in-stock", count: 1294 }],
        initialVisible: 1, // All visible
      },
      {
        id: "weight-range",
        name: "Weight Range",
        type: "checkbox", // Changed to checkbox based on HTML input type
        options: [
          { label: "0grams – 1grams", value: "0-1g", count: 130 },
          { label: "1grams – 2grams", value: "1-2g", count: 614 },
          { label: "2grams – 3grams", value: "2-3g", count: 509 },
          { label: "3grams – 4grams", value: "3-4g", count: 198 },
          { label: "4grams – 5grams", value: "4-5g", count: 54 },
          { label: "5grams – 10grams", value: "5-10g", count: 19 },
        ],
        initialVisible: 4,
      },
      {
        id: "occasion",
        name: "Occasion",
        type: "checkbox", // Changed to checkbox based on HTML input type
        options: [
          { label: "Valentine", value: "valentine", count: 55 },
          { label: "Wedding", value: "wedding", count: 87 },
          { label: "Festive", value: "festive", count: 281 },
          { label: "Daily Wear", value: "daily-wear", count: 817 },
          { label: "Casual Outings", value: "casual-outings", count: 1063 },
          { label: "Anniversary", value: "anniversary", count: 167 },
        ],
        initialVisible: 4,
      },
      {
        id: "rating",
        name: "Rating",
        type: "radio", // Changed to radio based on HTML input type
        options: [
          { label: "5 star(s)", value: "5-star", count: 239, rating: 5 },
          { label: "4 & up star(s)", value: "4-up-star", count: 814, rating: 4 },
          { label: "3 & up star(s)", value: "3-up-star", count: 817, rating: 3 },
          { label: "2 & up star(s)", value: "2-up-star", count: 818, rating: 2 },
        ],
        initialVisible: 4,
      },
      {
        id: "material-type",
        name: "Material Type",
        type: "checkbox",
        options: [
          { label: "Diamond", value: "diamond", count: 1185 },
          { label: "Gold", value: "gold", count: 209 },
          { label: "Platinum", value: "platinum", count: 14 },
          { label: "Solitaire", value: "solitaire", count: 45 },
        ],
        initialVisible: 4,
      },
      {
        id: "earrings-type",
        name: "Earrings Type",
        type: "checkbox",
        options: [
          { label: "Jhumkas", value: "jhumkas", count: 19 },
          { label: "Studs", value: "studs", count: 780 },
          { label: "Sui Dhaga", value: "sui-dhaga", count: 56 },
          { label: "Hoops & Huggies", value: "hoops-huggies", count: 262 },
          { label: "Drops & Dangles", value: "drops-dangles", count: 343 },
          { label: "Multi Pierced", value: "multi-pierced", count: 13 },
          { label: "Solitaire", value: "solitaire-earrings", count: 38 },
          { label: "Front and back", value: "front-back", count: 6 },
          { label: "Ear cuffs", value: "ear-cuffs", count: 31 },
          { label: "Chandelier", value: "chandelier", count: 3 },
          { label: "Chandbali", value: "chandbali", count: 9 },
          { label: "Detachables", value: "detachables", count: 13 },
          { label: "Miss - Match", value: "miss-match", count: 6 },
        ],
        initialVisible: 4,
        expandedByDefault: true, // This filter is "Less" by default in the screenshot
      },
      {
        id: "shop-for",
        name: "Shop For",
        type: "checkbox",
        options: [
          { label: "Women", value: "women", count: 1428 },
          { label: "Men", value: "men", count: 42 },
          { label: "Unisex", value: "unisex", count: 1 },
          { label: "Kids", value: "kids", count: 52 },
        ],
        initialVisible: 4,
      },
      {
        id: "price-range",
        name: "Price Range",
        type: "checkbox",
        options: [
          { label: "Below ₹10000", value: "below-10k", count: 35 },
          { label: "₹10,001 - ₹15,000", value: "10k-15k", count: 124 },
          { label: "₹15,001 - ₹20,000", value: "15k-20k", count: 120 },
          { label: "₹20,001 - ₹25,000", value: "20k-25k", count: 135 },
          { label: "₹25,001 - ₹30,000", value: "25k-30k", count: 173 },
          { label: "₹30,001 - ₹50,000", value: "30k-50k", count: 591 },
          { label: "₹50,001 - ₹75,000", value: "50k-75k", count: 263 },
          { label: "₹75,001 - ₹1,00,000", value: "75k-100k", count: 59 },
          { label: "Above ₹1,00,000", value: "above-100k", count: 24 },
        ],
        initialVisible: 4,
        expandedByDefault: true, // This filter is "Less" by default in the screenshot
      },
    ],
    products: [
      {
        id: "chandrak-diamond-stud-earrings",
        name: "Chandrak Diamond Stud Earrings",
        currentPrice: "33,626",
        originalPrice: "38,480",
        discount: "20% Off on Stone Price",
        rating: 4.7,
        reviews: 3,
        imageQuery: "diamond stud earrings",
        badge: "TRENDING",
        image: "https://www.candere.com/media/catalog/product/C/0/C025332_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "scallop-gold-earrings",
        name: "Scallop Gold Earrings",
        currentPrice: "20,396",
        originalPrice: "21,867",
        discount: "25% OFF on Making",
        rating: 4.8,
        reviews: 28,
        imageQuery: "scallop gold drop earrings",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/catalog/product/C/0/C014254__1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "feather-scape-peacock-gold-and-gemstone-earrings",
        name: "Feather Scape Peacock Gold And Gemstone Earrings",
        currentPrice: "21,934",
        originalPrice: "23,837",
        discount: "25% OFF on Making",
        rating: 4.8,
        reviews: 26,
        imageQuery: "peacock gold gemstone earrings",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/catalog/product/C/0/C022090_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "splinter-diamond-stud-earrings",
        name: "Splinter Diamond Stud Earrings",
        currentPrice: "37,703",
        originalPrice: "43,085",
        discount: "100% off on Making Charges",
        rating: 4.6,
        reviews: 5,
        imageQuery: "splinter diamond stud earrings",
        badge: "LIMITED DEAL",
        colorSwatch: "orange",
        image: "https://www.candere.com/media/catalog/product/K/C/KC03978__1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "black-enamel-diamond-earrings",
        name: "Black Enamel Diamond Earrings",
        currentPrice: "25,000",
        originalPrice: "28,000",
        discount: "15% OFF",
        rating: 4.5,
        reviews: 10,
        imageQuery: "black enamel diamond earrings",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/catalog/product/L/C/LCE0485_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "dangling-diamond-hoop-earrings",
        name: "Dangling Diamond Hoop Earrings",
        currentPrice: "30,500",
        originalPrice: "35,000",
        discount: "20% OFF",
        rating: 4.7,
        reviews: 15,
        imageQuery: "dangling diamond hoop earrings",
        badge: "LIMITED DEAL",
        image: "https://www.candere.com/media/catalog/product/C/0/C022008_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
      {
        id: "elenai-gold-hoop-earrings",
        name: "Elenai Gold Hoop Earrings",
        currentPrice: "12,463",
        originalPrice: "13,552",
        discount: "20% Off on Stone Price",
        rating: 4.7,
        reviews: 54,
        imageQuery: "gold hoop earrings",
        badge: "OUR PICK",
        image: "https://www.candere.com/media/catalog/product/L/C/LCE0548_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360"
      },
    ],
  },
  rings: {
    name: "Rings",
    filters: [
      {
        id: "ring-type",
        name: "Ring Type",
        type: "checkbox",
        options: [
          { label: "Engagement Rings", value: "engagement", count: 150 },
          { label: "Diamond Rings", value: "diamond", count: 300 },
          { label: "Gold Rings", value: "gold", count: 200 },
        ],
        initialVisible: 3,
      },
      {
        id: "metal-color",
        name: "Metal Color",
        type: "radio",
        options: [
          { label: "Yellow Gold", value: "yellow", count: 400 },
          { label: "White Gold", value: "white", count: 250 },
          { label: "Rose Gold", value: "rose", count: 150 },
        ],
        initialVisible: 3,
      },
    ],
    products: [
      {
        id: "classic-solitaire-ring",
        name: "Classic Solitaire Ring",
        currentPrice: "50,000",
        originalPrice: "55,000",
        discount: "10% Off",
        rating: 4.9,
        reviews: 50,
        imageQuery: "classic solitaire diamond ring",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/jewellery/images/KC05017YG_1.jpeg"
      },
      {
        id: "floral-gold-ring",
        name: "Floral Gold Ring",
        currentPrice: "22,000",
        originalPrice: "24,000",
        discount: "8% Off",
        rating: 4.5,
        reviews: 20,
        imageQuery: "floral design gold ring",
        badge: "TRENDING",
        image: "https://www.candere.com/media/jewellery/images/KC01124__1.jpeg"
      },
    ],
  },
  necklace: {
    name: "Necklace",
    filters: [
      {
        id: "necklace-style",
        name: "Necklace Style",
        type: "checkbox",
        options: [
          { label: "Pendant Necklace", value: "pendant", count: 200 },
          { label: "Chain Necklace", value: "chain", count: 100 },
          { label: "Choker Necklace", value: "choker", count: 50 },
        ],
        initialVisible: 3,
      },
    ],
    products: [
      {
        id: "diamond-heart-pendant",
        name: "Diamond Heart Pendant",
        currentPrice: "35,000",
        originalPrice: "40,000",
        discount: "12% Off",
        rating: 4.8,
        reviews: 30,
        imageQuery: "diamond heart pendant necklace",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/jewellery/images/KC03591__1.jpeg"
      },
      {
        id: "gold-chain-with-pearl",
        name: "Gold Chain with Pearl",
        currentPrice: "18,000",
        originalPrice: "20,000",
        discount: "10% Off",
        rating: 4.6,
        reviews: 18,
        imageQuery: "gold chain with pearl necklace",
        badge: "LIMITED DEAL",
        image:"https://www.candere.com/media/jewellery/images/C019604_1_1.jpeg",
      },
    ],
  },
  "bangles-bracelets": {
    name: "Bangles & Bracelets",
    filters: [
      {
        id: "bracelet-type",
        name: "Bracelet Type",
        type: "checkbox",
        options: [
          { label: "Tennis Bracelets", value: "tennis", count: 80 },
          { label: "Cuff Bracelets", value: "cuff", count: 40 },
          { label: "Bangles", value: "bangles", count: 120 },
        ],
        initialVisible: 3,
      },
    ],
    products: [
      {
        id: "diamond-tennis-bracelet",
        name: "Diamond Tennis Bracelet",
        currentPrice: "75,000",
        originalPrice: "85,000",
        discount: "11% Off",
        rating: 4.9,
        reviews: 25,
        imageQuery: "diamond tennis bracelet",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/jewellery/images/c021371_1.jpeg"
      },
      {
        id: "gold-kada-bracelet",
        name: "Gold Kada Bracelet",
        currentPrice: "45,000",
        originalPrice: "50,000",
        discount: "10% Off",
        rating: 4.7,
        reviews: 15,
        imageQuery: "gold kada bracelet",
        badge: "TRENDING",
        image:"https://www.candere.com/media/jewellery/images/KC06407PLT_Creative.jpeg"
      },
    ],
  },
  solitaires: {
    name: "Solitaires",
    filters: [
      {
        id: "solitaire-type",
        name: "Solitaire Type",
        type: "checkbox",
        options: [
          { label: "Solitaire Rings", value: "solitaire-rings", count: 100 },
          { label: "Solitaire Pendants", value: "solitaire-pendants", count: 70 },
          { label: "Solitaire Earrings", value: "solitaire-earrings", count: 50 },
        ],
        initialVisible: 3,
      },
    ],
    products: [
      {
        id: "round-solitaire-diamond-ring",
        name: "Round Solitaire Diamond Ring",
        currentPrice: "1,20,000",
        originalPrice: "1,30,000",
        discount: "7% Off",
        rating: 4.9,
        reviews: 60,
        imageQuery: "round solitaire diamond ring",
        badge: "BESTSELLER",
        image: "https://www.candere.com/media/jewellery/images/KC05017YG_1.jpeg"
      },
      {
        id: "princess-cut-solitaire-pendant",
        name: "Princess Cut Solitaire Pendant",
        currentPrice: "90,000",
        originalPrice: "98,000",
        discount: "8% Off",
        rating: 4.8,
        reviews: 40,
        imageQuery: "princess cut solitaire pendant",
        badge: "LIMITED DEAL",
        image:"https://www.candere.com/media/jewellery/images/C022020_1.jpeg"
      },
    ],
  },
  "mangalsutras-pendants": {
    name: "Mangalsutras & Pendants",
    filters: [
      {
        id: "mangalsutra-type",
        name: "Mangalsutra Type",
        type: "checkbox",
        options: [
          { label: "Short Mangalsutra", value: "short", count: 60 },
          { label: "Long Mangalsutra", value: "long", count: 40 },
        ],
        initialVisible: 2,
      },
    ],
    products: [
      {
        id: "traditional-gold-mangalsutra",
        name: "Traditional Gold Mangalsutra",
        currentPrice: "60,000",
        originalPrice: "65,000",
        discount: "7% Off",
        rating: 4.7,
        reviews: 22,
        imageQuery: "traditional gold mangalsutra",
        badge: "TRENDING",
        image :"https://www.candere.com/media/jewellery/images/K000730_1.jpg"
      },
      {
        id: "diamond-mangalsutra-pendant",
        name: "Diamond Mangalsutra Pendant",
        currentPrice: "70,000",
        originalPrice: "78,000",
        discount: "10% Off",
        rating: 4.8,
        reviews: 18,
        imageQuery: "diamond mangalsutra pendant",
        badge: "BESTSELLER",
        image:"https://www.candere.com/media/jewellery/images/KC06617RG_1.jpg"
      },
    ],
  },
  "other-jewellery": {
    name: "Other Jewellery",
    filters: [
      {
        id: "other-type",
        name: "Other Type",
        type: "checkbox",
        options: [
          { label: "Nose Pins", value: "nose-pins", count: 30 },
          { label: "Toe Rings", value: "toe-rings", count: 15 },
        ],
        initialVisible: 2,
      },
    ],
    products: [
      {
        id: "diamond-nose-pin",
        name: "Diamond Nose Pin",
        currentPrice: "8,000",
        originalPrice: "9,000",
        discount: "10% Off",
        rating: 4.5,
        reviews: 12,
        imageQuery: "diamond nose pin",
        badge: "BESTSELLER",
        image:"https://www.candere.com/media/jewellery/images/C007029__1.jpeg"
      },
      {
        id: "gold-toe-ring",
        name: "Gold Toe Ring",
        currentPrice: "5,000",
        originalPrice: "5,500",
        discount: "9% Off",
        rating: 4.2,
        reviews: 8,
        imageQuery: "gold toe ring",
        badge: "TRENDING",
        image:"https://www.candere.com/media/jewellery/images/LCR0579_1.jpeg"
      },
    ],
  },
  gifts: {
    name: "Gifts",
    filters: [
      {
        id: "gift-occasion",
        name: "Gift Occasion",
        type: "checkbox",
        options: [
          { label: "Birthday Gifts", value: "birthday", count: 100 },
          { label: "Anniversary Gifts", value: "anniversary", count: 80 },
          { label: "Wedding Gifts", value: "wedding", count: 50 },
        ],
        initialVisible: 3,
      },
    ],
    products: [
      {
        id: "personalized-pendant",
        name: "Personalized Pendant",
        currentPrice: "15,000",
        originalPrice: "16,500",
        discount: "9% Off",
        rating: 4.6,
        reviews: 20,
        imageQuery: "personalized pendant",
        badge: "BESTSELLER",
      },
      {
        id: "gift-card",
        name: "Gift Card",
        currentPrice: "5,000",
        originalPrice: "5,000",
        discount: "No Discount",
        rating: 5.0,
        reviews: 5,
        imageQuery: "gift card",
        badge: "NEW",
      },
    ],
  },
  offers: {
    name: "Offers",
    filters: [],
    products: [], // Products with offers would be dynamically fetched
  },
  features: {
    name: "Features",
    filters: [],
    products: [], // Products with specific features would be dynamically fetched
  },
  bestsellers: {
    name: "Bestsellers",
    filters: [],
    products: [], // Bestsellers would be dynamically fetched
  },
  "new-arrivals": {
    name: "New Arrivals",
    filters: [],
    products: [], // New arrivals would be dynamically fetched
  },
}

const categoryBanners = {
  earrings: {
    image: "https://www.candere.com/media/catalog/category/Earrings-Listing-Page-Banner.jpg",
    alt: "Earrings Banner",
  },
  rings: {
    image: "https://www.candere.com/media/catalog/category/Ring-Listing-Page-Banner.jpg",
    alt: "Rings Banner",
  },
  necklace: {
    image: "https://www.candere.com/media/catalog/category/Necklace-Listing-Page-Banner.jpg",
    alt: "Necklace Banner",
  },
  "bangles-bracelets": {
    image: "https://www.candere.com/media/catalog/category/Bracelets-Listing-Page-Banner.jpg",
    alt: "Bangles & Bracelets Banner",
  },
  solitaires: {
    image: "https://www.candere.com/media/catalog/category/Solitaire-LP_2.jpg",
    alt: "Solitaires Banner",
  },
  "mangalsutras-pendants": {
    image: "https://www.candere.com/media/catalog/category/LP-Bestseller_1_.jpg",
    alt: "Mangalsutras & Pendants Banner",
  },
  "other-jewellery": {
    image: "https://www.candere.com/media/catalog/category/Exchange-PLP.jpg",
    alt: "Other Jewellery Banner",
  },
  gifts: {
    image: "https://www.candere.com/media/catalog/category/Gifting-Desktop.jpg",
    alt: "Gifts Banner",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;
  const categoryData = productCategories[slug as keyof typeof productCategories];
  const bannerData = categoryBanners[slug as keyof typeof categoryBanners];

  if (!categoryData) {
    return <div className="text-center py-10">Category not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Dynamic Banner */}
      {bannerData && (
        <div className="w-full relative h-64 md:h-80 lg:h-[30vh] xl:h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a2a36] to-[#1a4d5c] mb-6">
          <img
            src={bannerData.image}
            alt={bannerData.alt}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4 md:px-8 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /
        <Link href="/category/jewellery" className="hover:underline">
          Jewellery
        </Link>{" "}
        / <span className="font-semibold capitalize">{categoryData.name}</span>
      </div>

      {/* Tabs */}
      <div className="bg-white py-4 px-4 md:px-8 border-b border-gray-200 flex gap-4 overflow-x-auto">
        <Button className="bg-[#009999] text-white px-6 py-2 rounded-full">All</Button>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 px-6 py-2 rounded-full bg-transparent"
        >
          In Stock
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Sidebar - Filters */}
        <aside className="w-full lg:w-72 p-4 md:p-8 border-r border-gray-200 bg-white lg:h-[calc(100vh-150px)] lg:overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">FILTERS</h2>
            <span className="text-lg font-bold text-[#009999]">0</span>
          </div>

          <strong
            role="heading"
            aria-level={2}
            className="block-subtitle filter-subtitle mb-4"
          >
            Shopping Options
          </strong>

          <Accordion type="multiple" className="w-full">
            {categoryData.filters.map((filter) => (
              <AccordionItem key={filter.id} value={filter.id}>
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline py-4">
                  {filter.name}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <FilterOptions filter={filter} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </aside>

        {/* Right Content - Product Grid */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          <div className="flex justify-end items-center mb-6">
            <span className="text-gray-700 mr-2">Sort By:</span>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px] rounded-md border border-gray-300 bg-white">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryData.products.map((product: any) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative group"
              >
                {product.badge && (
                  <div
                    className={`absolute top-0 left-0 px-3 py-1 text-xs font-semibold text-white rounded-br-lg ${
                      product.badge === "TRENDING"
                        ? "bg-pink-500"
                        : product.badge === "BESTSELLER"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white rounded-full shadow-md"
                  >
                    <PlayCircle className="w-5 h-5 text-gray-700" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white rounded-full shadow-md"
                  >
                    <Heart className="w-5 h-5 text-gray-700" />
                  </Button>
                </div>
                <Image
                  src={
                    product.image ||
                    `/placeholder.svg?height=360&width=360&query=${product.imageQuery}`
                  }
                  alt={product.name}
                  width={250}
                  height={250}
                  className="w-full h-60 object-contain p-4"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-[#009999]">
                      ₹{product.currentPrice}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </div>
                  </div>
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {product.discount}
                  </p>
                  <h3 className="text-base font-medium text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span>{product.rating}</span>
                    <span className="ml-1">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterOptions({ filter }: { filter: any }) {
  const [showAll, setShowAll] = useState(filter.expandedByDefault || false)
  const visibleOptions = showAll ? filter.options : filter.options.slice(0, filter.initialVisible)
  const hasMore = filter.options.length > filter.initialVisible

  return (
    <div className="space-y-3">
      {filter.type === "radio" ? (
        <RadioGroup defaultValue={visibleOptions[0]?.value}>
          {visibleOptions.map((option: any) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <label htmlFor={option.value} className="text-gray-700 flex justify-between w-full">
                <span>
                  {option.label}
                  {option.rating && (
                    <span className="inline-flex ml-1">
                      {[...Array(option.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                      {option.label.includes("& up") && <span className="ml-1">& up</span>}
                    </span>
                  )}
                </span>
                <span className="text-gray-500">{option.count}</span>
              </label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        visibleOptions.map((option: any) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox id={option.value} />
            <label htmlFor={option.value} className="text-gray-700 flex justify-between w-full">
              <span>{option.label}</span>
              <span className="text-gray-500">{option.count}</span>
            </label>
          </div>
        ))
      )}
      {hasMore && (
        <button onClick={() => setShowAll(!showAll)} className="text-[#009999] text-sm hover:underline mt-2 block">
          {showAll ? "Less" : `Show (${filter.options.length - filter.initialVisible}) more`}
        </button>
      )}
    </div>
  )
}