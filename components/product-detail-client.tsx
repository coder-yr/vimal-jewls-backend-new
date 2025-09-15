"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductInformation } from "@/components/product-information";

interface ProductImage {
  src: string;
  alt: string;
  type?: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  image?: string;
  currentPrice?: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  images?: ProductImage[] | string; // Can be string when coming from DB
  badges?: string[];
  youMayAlsoLike?: RelatedProduct[];
  reviews?: any[];
  priceBreakup?: any[];
  grandTotal?: string;
  productSummary?: {
    [key: string]: string;
  };
  currentPrice?: string;
  price?: string;
  originalPrice?: string;
  mrp?: string;
  slug: string;
  shortcode: string;
  categoryId: number;
  collectionId: number;
  [key: string]: any; // For other fields we might receive
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Star,
  Share2,
  Heart,
  Truck,
  Clock,
  Camera,
  MessageCircle,
  Phone,
  ChevronDown,
  TrendingUp,
  Crown,
  Gift,
  Book,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/section-header";
import { ProductSummaryCard } from "@/components/product-summary-card";
import { HelpCard } from "@/components/help-card";
import { PriceBreakupAccordion } from "@/components/price-breakup-accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel } from "@/components/ui/carousel";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductSizeSelector from "@/components/product-size-selector";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useState } from "react";

// Dummy product data for demonstration (kept here for simplicity, but ideally fetched)
const productData = {
  id: "elenai-gold-hoop-earrings",
  name: "Elenai Gold Hoop Earrings",
  inDemand: "20+ Shoppers bought this in the last 30 Days",
  rating: 4.7,
  reviews: 54,
  currentPrice: "12,463",
  originalPrice: "13,552",
  youSave: "1,089",
  badges: ["OUR PICK", "SHIPS IN 24 HRS"],
  images: [
    {
      src: "https://www.candere.com/media/jewellery/images/C025336_creative.jpeg?height=400&width=400",
      alt: "Elenai Gold Hoop Earrings Front",
    },
    {
      src: "https://www.candere.com/media/jewellery/images/C025336_model_creative.jpeg?height=400&width=400",
      alt: "Elenai Gold Hoop Earrings Side",
    },
    {
      src: "https://www.candere.com/media/jewellery/images/C025336_2.jpeg?height=400&width=400",
      alt: "Elenai Gold Hoop Earrings On Ear",
    },
    {
      src: "https://www.candere.com/media/jewellery/images/C025336_4.jpeg?height=400&width=400",
      alt: "Elenai Gold Hoop Earrings Dimensions",
    },
  ],
  description:
    "Make a statement with the Elenai Gold Hoop Earrings, designed in 14k gold. These earrings bring volume and edge to your look without compromising comfort. Crafted for women who prefer bold accessories that are still wearable, these hoops are excellent for styling with both sarees and dresses. Shine brighter in these gold earrings for girls or women who like to stand out with trendy hoop earrings.",
  productSummary: {
    styleNo: "GE01005",
    width: "0.25 cm (2.50 mm)",
    height: "1.6 cm (16.00 mm)",
    metalWeight: "1.51g",
    grossWeight: "1.51g",
  },
  metalDetails:
    "*A differential amount will be applicable with difference in weight if any.",
  includedWithPurchase: [
    { icon: Truck, text: "Free Domestic Shipping" },
    { icon: Gift, text: "Gift Box" },
    { icon: Book, text: "Care Tips" },
    { icon: CheckCircle, text: "Jewellery Certificate" },
    { icon: Phone, text: "24x7 Customer Support" },
  ],
  youMayAlsoLike: [
    {
      id: "1",
      name: "Ekathva Gold Half Hoop Earrings",
      currentPrice: "14,621",
      originalPrice: "15,911",
      discount: "25% OFF ON MAKING",
      rating: 4.8,
      reviews: 31,
      imageQuery: "gold half hoop earrings textured",
      badge: "TOP RATED",
      image: "https://www.candere.com/media/jewellery/images/C011659_1.jpeg",
    },
    {
      id: "2",
      name: "Athulya Gold Half Hoop Earrings",
      currentPrice: "11,925",
      originalPrice: "12,978",
      discount: "25% OFF ON MAKING",
      rating: 4.8,
      reviews: 25,
      imageQuery: "gold half hoop earrings geometric",
      badge: "TRENDING",
      image: "https://www.candere.com/media/jewellery/images/KC06684YG_1.jpeg",
    },
    {
      id: "3",
      name: "Iris Gold Hoop Earrings",
      currentPrice: "12,824",
      originalPrice: "13,956",
      discount: "25% OFF ON MAKING",
      rating: 5,
      reviews: 2,
      imageQuery: "gold hoop earrings simple",
      badge: "OUR PICK",
      image: "https://www.candere.com/media/jewellery/images/KC06683YG_1.jpeg",
    },
    {
      id: "4",
      name: "Aicha Gold Half Hoop Earrings",
      currentPrice: "11,258",
      originalPrice: "12,280",
      discount: "25% OFF ON MAKING",
      rating: 4,
      reviews: 2,
      imageQuery: "gold half hoop earrings intricate",
      badge: "TRENDING",
      image:
        "https://www.candere.com/media/jewellery/images/KC06769YG__1_1.jpeg",
    },
  ],
};

const products = [
  {
    id: "dangling-diamond-hoop-earrings",
    name: "Dangling Diamond Hoop Earrings",
    inDemand: "500+ Shoppers bought this in the last 30 Days", // (You can fill this in depending on shopper data)
    rating: 4.8, // (Estimated average rating)
    reviews: 37, // (Sample review count)
    currentPrice: "2,399", // Example price (e.g., from lab-grown diamond pair):contentReference[oaicite:1]{index=1}
    originalPrice: "2,999",
    youSave: "600",
    badges: ["ELEGANT", "VERSATILE"],
    images: [
      {
        src: "https://www.candere.com/media/jewellery/images/C022008_1.jpg",
        alt: "Dangling Diamond Hoop Earrings Front",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C022008_2.jpg",
        alt: "Dangling Diamond Hoop Earrings Side",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C022008_3.jpg",
        alt: "Dangling Diamond Hoop Earrings On Ear",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C022008_4.jpg",
        alt: "Dangling Diamond Hoop Earrings Detail",
      },
    ],
    description:
      "Timeless elegance meets subtle movement—these Dangling Diamond Hoop Earrings feature a delicate hoop with a round-cut diamond charm that sways with every turn. Crafted in 14K white gold (also available in yellow or rose gold), they're perfect for adding a touch of sparkle to daily wear or elevating your evening look.",
    productSummary: {
      metal: "14K Gold (White/Yellow/Rose)",
      hoopDiameter: "10–12 mm",
      diamondType: "Lab-Grown or Natural",
      totalDiamondWeight: "0.5 ct (approx.)",
    },
    metalDetails: "*Weight and metal options may vary based on customization.",
    includedWithPurchase: [
      { icon: "Truck", text: "Free Domestic Shipping" },
      { icon: "Gift", text: "Gift Box" },
      { icon: "Book", text: "Care Tips" },
      { icon: "CheckCircle", text: "Jewellery Certificate" },
      { icon: "Phone", text: "24x7 Customer Support" },
    ],
    youMayAlsoLike: [
      {
        id: "removable-diamond-dangle-huggies",
        name: "Removable Diamond Dangle Huggies",
        currentPrice: "2,260",
        originalPrice: "2,600",
        discount: "Save on versatile charm",
        rating: 4.7,
        reviews: 15,
        imageQuery: "14k gold huggie with removable diamond charm",
        badge: "VERSATILE",
        image: "https://www.candere.com/media/jewellery/images/C011659_1.jpeg",
      },
      {
        id: "starry-night-diamond-drop-hoops",
        name: "Starry Night Diamond Drop Hoops",
        currentPrice: "675",
        originalPrice: "750",
        discount: "—",
        rating: 4.9,
        reviews: 27,
        imageQuery: "starry night diamond drop hoop earrings",
        badge: "SUBTLE SPARKLE",
        image: "https://www.candere.com/media/jewellery/images/KC06684YG_1.jpeg",
      },
      {
        id: "diamond-hoop-with-dangle-charm",
        name: "Diamond Hoop with Dangle Charm",
        currentPrice: "1,275",
        originalPrice: "1,500",
        discount: "Save on elegance",
        rating: 4.8,
        reviews: 12,
        imageQuery: "diamond hoop earring with removable charm",
        badge: "CUSTOMIZABLE",
        image: "https://www.candere.com/media/jewellery/images/KC06683YG_1.jpeg",
      },
    ],
  },
  {
    id: "elenai-gold-hoop-earrings",
    name: "Elenai Gold Hoop Earrings",
    inDemand: "20+ Shoppers bought this in the last 30 Days",
    rating: 4.7,
    reviews: 54,
    currentPrice: "12,463",
    originalPrice: "13,552",
    youSave: "1,089",
    badges: ["OUR PICK", "SHIPS IN 24 HRS"],
    images: [
      {
        src: "https://www.candere.com/media/jewellery/images/C025336_creative.jpeg?height=400&width=400",
        alt: "Elenai Gold Hoop Earrings Front",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C025336_model_creative.jpeg?height=400&width=400",
        alt: "Elenai Gold Hoop Earrings Side",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C025336_2.jpeg?height=400&width=400",
        alt: "Elenai Gold Hoop Earrings On Ear",
      },
      {
        src: "https://www.candere.com/media/jewellery/images/C025336_4.jpeg?height=400&width=400",
        alt: "Elenai Gold Hoop Earrings Dimensions",
      },
    ],
    description:
      "Make a statement with the Elenai Gold Hoop Earrings, designed in 14k gold. These earrings bring volume and edge to your look without compromising comfort. Crafted for women who prefer bold accessories that are still wearable, these hoops are excellent for styling with both sarees and dresses. Shine brighter in these gold earrings for girls or women who like to stand out with trendy hoop earrings.",
    productSummary: {
      styleNo: "GE01005",
      width: "0.25 cm (2.50 mm)",
      height: "1.6 cm (16.00 mm)",
      metalWeight: "1.51g",
      grossWeight: "1.51g",
    },
    metalDetails:
      "*A differential amount will be applicable with difference in weight if any.",
    includedWithPurchase: [
      { icon: Truck, text: "Free Domestic Shipping" },
      { icon: Gift, text: "Gift Box" },
      { icon: Book, text: "Care Tips" },
      { icon: CheckCircle, text: "Jewellery Certificate" },
      { icon: Phone, text: "24x7 Customer Support" },
    ],
    youMayAlsoLike: [
      {
        id: "1",
        name: "Ekathva Gold Half Hoop Earrings",
        currentPrice: "14,621",
        originalPrice: "15,911",
        discount: "25% OFF ON MAKING",
        rating: 4.8,
        reviews: 31,
        imageQuery: "gold half hoop earrings textured",
        badge: "TOP RATED",
        image: "https://www.candere.com/media/jewellery/images/C011659_1.jpeg",
      },
      {
        id: "2",
        name: "Athulya Gold Half Hoop Earrings",
        currentPrice: "11,925",
        originalPrice: "12,978",
        discount: "25% OFF ON MAKING",
        rating: 4.8,
        reviews: 25,
        imageQuery: "gold half hoop earrings geometric",
        badge: "TRENDING",
        image:
          "https://www.candere.com/media/jewellery/images/KC06684YG_1.jpeg",
      },
      {
        id: "3",
        name: "Iris Gold Hoop Earrings",
        currentPrice: "12,824",
        originalPrice: "13,956",
        discount: "25% OFF ON MAKING",
        rating: 5,
        reviews: 2,
        imageQuery: "gold hoop earrings simple",
        badge: "OUR PICK",
        image:
          "https://www.candere.com/media/jewellery/images/KC06683YG_1.jpeg",
      },
      {
        id: "4",
        name: "Aicha Gold Half Hoop Earrings",
        currentPrice: "11,258",
        originalPrice: "12,280",
        discount: "25% OFF ON MAKING",
        rating: 4,
        reviews: 2,
        imageQuery: "gold half hoop earrings intricate",
        badge: "TRENDING",
        image:
          "https://www.candere.com/media/jewellery/images/KC06769YG__1_1.jpeg",
      },
    ],
  },
  {
    id: "chandrak-diamond-stud-earrings",
    name: "Chandrak Diamond Stud Earrings",
    inDemand: "10+ Shoppers bought this in the last 30 Days",
    rating: 4.9,
    reviews: 45,
    currentPrice: "25,000",
    originalPrice: "30,000",
    youSave: "5,000",
    badges: ["BESTSELLER", "LIMITED STOCK"],
    images: [
      {
        src: "https://example.com/chandrak-front.jpg",
        alt: "Chandrak Diamond Stud Earrings Front",
      },
      {
        src: "https://example.com/chandrak-side.jpg",
        alt: "Chandrak Diamond Stud Earrings Side",
      },
    ],
    description:
      "The Chandrak Diamond Stud Earrings are a perfect blend of elegance and sophistication. Crafted with precision, these earrings are ideal for any occasion.",
    productSummary: {
      styleNo: "CDS12345",
      width: "0.5 cm",
      height: "0.5 cm",
      metalWeight: "2.0g",
      grossWeight: "2.0g",
    },
    metalDetails: "*Weight may vary slightly due to manual craftsmanship.",
    includedWithPurchase: [
      { icon: Truck, text: "Free Domestic Shipping" },
      { icon: Gift, text: "Gift Box" },
      { icon: Book, text: "Care Tips" },
      { icon: CheckCircle, text: "Jewellery Certificate" },
      { icon: Phone, text: "24x7 Customer Support" },
    ],
    youMayAlsoLike: [
      {
        id: "diamond-stud-earrings",
        name: "Diamond Stud Earrings",
        currentPrice: "20,000",
        originalPrice: "25,000",
        discount: "20% OFF",
        rating: 4.8,
        reviews: 30,
        image: "https://example.com/diamond-stud.jpg",
        badge: "TRENDING",
      },
    ],
  },
];

export default function ProductDetailClient({ product }: { product: Product }) {
  // Ensure product data is safe to use with defaults
  const safeProduct = {
    ...product,
    images: Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [{
          src: "/placeholder.jpg",
          alt: product.name || "Product Image"
        }],
    currentPrice: product.currentPrice || product.price || "0",
    originalPrice: product.originalPrice || product.mrp || "0",
    badges: Array.isArray(product.badges) ? product.badges : [],
    youMayAlsoLike: Array.isArray(product.youMayAlsoLike) ? product.youMayAlsoLike : [],
    reviews: Array.isArray(product.reviews) ? product.reviews : [],
    priceBreakup: Array.isArray(product.priceBreakup) ? product.priceBreakup : [],
    description: product.description || "No description available"
  };
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    Array.isArray(safeProduct.images) && safeProduct.images.length > 0
      ? safeProduct.images[0].src
      : "/placeholder.jpg"
  );
  const [imageSlots, setImageSlots] = useState<(string | null)[]>([null, null, null]);
  const dispatch = useDispatch();
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [selectedRingSize, setSelectedRingSize] = useState<number | null>(null);
  const sampleSizeOptions = [
    { sizeNumber: 7, diameter: 15, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 8, diameter: 15.3, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 9, diameter: 15.6, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 10, diameter: 15.9, availabilityStatus: "In Stock" as const },
    { sizeNumber: 11, diameter: 16.2, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 12, diameter: 16.5, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 13, diameter: 16.8, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 14, diameter: 17.2, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 15, diameter: 17.5, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 16, diameter: 17.8, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 17, diameter: 18.1, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 18, diameter: 18.4, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 19, diameter: 18.8, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 20, diameter: 19.1, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 21, diameter: 19.4, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 22, diameter: 19.7, availabilityStatus: "Made to Order" as const },
    { sizeNumber: 23, diameter: 20, availabilityStatus: "Made to Order" as const },
  ];

  const handleSizeSelect = (size: any) => {
  setSelectedRingSize(size.sizeNumber);
  console.log("Size selected:", size);
  };

  const handleConfirm = (selectedSize: any) => {
  setSelectedRingSize(selectedSize.sizeNumber);
  console.log("Confirmed size:", selectedSize);
  setShowSizeSelector(false);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: String(safeProduct.id),
        name: safeProduct.name,
        price: Number.parseFloat((safeProduct.currentPrice || "0").replace(/,/g, "")),
        quantity: 1,
        image: Array.isArray(safeProduct.images) && safeProduct.images[0]?.src || "/placeholder.jpg",
        metal: "14K Yellow Gold (1.51g)", // Mock metal detail
        ringSize: selectedRingSize,
      })
    );
    alert(`Item added to cart!${selectedRingSize ? ' Size: ' + selectedRingSize : ''}`);
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: String(safeProduct.id),
        name: safeProduct.name,
        price: Number.parseFloat((safeProduct.currentPrice || "0").replace(/,/g, "")),
        quantity: 1,
        image: safeProduct.images[0].src,
        metal: "14K Yellow Gold (1.51g)",
        ringSize: selectedRingSize,
      })
    );
    router.push("/checkout");
  };

  const handleImageUpload = (newImage: string) => {
    setImageSlots((prevSlots) => {
      const updatedSlots = [...prevSlots];
      const emptyIndex = updatedSlots.findIndex((slot) => slot === null);
      if (emptyIndex !== -1) {
        updatedSlots[emptyIndex] = newImage;
      } else {
        updatedSlots.push(newImage);
      }
      return updatedSlots;
    });
  };

  // Map product fields to ProductInformation's expected prop structure
  const productInfoData = {
    title: product.name,
    description: product.description || "",
    image: Array.isArray(product.images) ? product.images[0]?.src : product.images || "",
    details: {
      styleNo: product.shortcode || "",
      ringSize: product.size || "",
      metalWeight: product.metalWeight || "",
      grossWeight: product.grossWeight || "",
      metalDetails: product.metalDetails || [],
      diamondDetails: product.diamondDetails || [],
    },
    priceBreakdown: {
      metal: { original: Number(product.metalPrice) || 0, discounted: Number(product.metalDiscountedPrice) || undefined },
      diamond: { original: Number(product.diamondPrice) || 0, discounted: Number(product.diamondDiscountedPrice) || undefined },
      makingCharges: { original: Number(product.makingCharges) || 0, discounted: Number(product.makingChargesDiscounted) || undefined },
      gst: { original: Number(product.gst) || 0, discounted: Number(product.gstDiscounted) || undefined },
      grandTotal: Number(product.price) || Number(product.currentPrice) || Number(product.mrp) || 0,
    },
    grandTotal: Number(product.price) || Number(product.currentPrice) || Number(product.mrp) || 0,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4 md:px-8 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/category/jewellery" className="hover:underline">
          Jewellery
        </Link>{" "}
        /{" "}
        <Link href="/category/earrings" className="hover:underline">
          Earrings
        </Link>{" "}
        / <span className="font-semibold">{safeProduct.name}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Left Section - Product Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {safeProduct.images
              .filter((img: ProductImage) => !img.type || img.type === "image")
              .map((item: ProductImage, idx: number) => (
                <Zoom key={idx}>
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt || "Product Image"}
                    width={500}
                    height={500}
                    className="object-contain rounded-lg w-full"
                  />
                </Zoom>
              ))}
          </div>
        </div>
        {/* Right Section - Product Details Card */}
        <div className="flex-1 flex flex-col gap-6 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            310+ views in the last 48 Hours
          </p>
          <Button variant="outline" className="mb-2 w-fit">
            View Details{" "}
            <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
          <div className="flex gap-2 mb-2">
            {safeProduct.badges?.map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  badge === "SHIPS IN 24 HRS"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-blue-100 text-blue-700 border border-blue-300"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex items-end gap-4 mb-2">
            <span className="text-3xl font-bold text-[#009999]">
              ₹{product.currentPrice}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
              OFFER: 25% OFF ON STONE PRICE
            </span>
            <Link
              href="#"
              className="text-xs text-[#009999] hover:underline"
            >
              Notify me When Price Drops
            </Link>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-start gap-3 mb-2">
            <Truck className="w-6 h-6 text-gray-700 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">
                Free Shipping by Tomorrow
              </p>
              <p className="text-sm text-gray-600">
                Order within 20:47:13 to enjoy 24-hours shipping!{" "}
                <Link
                  href="#"
                  className="text-xs text-[#009999] hover:underline"
                >
                  T&C Apply
                </Link>
              </p>
            </div>
          </div>
          {/* Sizing & Selection Card */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
              Sizing & Selection
            </h2>
            <div className="mb-4">
              <label
                htmlFor="ring-size"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Ring Size
              </label>
              <Button
                variant="outline"
                className="w-full rounded-md border border-gray-300 bg-white"
                onClick={() => setShowSizeSelector(true)}
              >
                Choose Size
              </Button>
              <Link
                href="#"
                className="text-xs text-[#009999] hover:underline mt-2 inline-block"
              >
                Find your perfect size
              </Link>
            </div>
            <div>
              <label
                htmlFor="customization"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Customization
              </label>
              <Select defaultValue="14k-rose-gold">
                <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white">
                  <SelectValue placeholder="14k Rose Gold - In Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14k-rose-gold">
                    14k Rose Gold - In Stock
                  </SelectItem>
                  <SelectItem value="18k-yellow-gold">
                    18k Yellow Gold - In Stock
                  </SelectItem>
                  <SelectItem value="22k-white-gold">
                    22k White Gold - In Stock
                  </SelectItem>
                </SelectContent>
              </Select>
              <Link
                href="#"
                className="text-xs text-[#009999] hover:underline mt-2 inline-block"
              >
                Diamond Guide
              </Link>
            </div>
          </div>
          <div className="hidden lg:block mt-6">
      {showSizeSelector && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-[rgba(0,0,0,0.08)]">
          <div className="bg-white shadow-2xl w-full max-w-lg h-full flex flex-col right-0 animate-slideIn relative">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
              <div>
                <div className="text-2xl font-bold text-[#009999]">₹{safeProduct.currentPrice}</div>
                <div className="text-base text-gray-500 line-through">₹{safeProduct.originalPrice}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-700">Delivery by <span className="font-semibold">7th Oct 2025</span></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-2"
                  onClick={() => setShowSizeSelector(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            {/* Size Grid Only */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="mb-4 font-semibold text-lg">Pick your Size</div>
              <ProductSizeSelector
                currentPrice={Number(safeProduct.currentPrice?.replace(/,/g, "")) || 0}
                originalPrice={Number(safeProduct.originalPrice?.replace(/,/g, "")) || 0}
                currency="₹"
                deliveryDate="7th Oct 2025"
                sizeOptions={sampleSizeOptions}
                onSizeSelect={handleSizeSelect}
                onConfirm={handleConfirm}
              />
            </div>
            {/* Sticky Confirm Button */}
            {/* Confirm button removed; handled by ProductSizeSelector */}
          </div>
        </div>
      )}
            <Button className="w-full bg-[#009999] text-white py-4 text-lg font-semibold rounded-lg">
              ADD TO CART
            </Button>
          </div>
          <Button
            onClick={handleBuyNow}
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Buy Now
          </Button>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#009999] text-white py-3 px-4 flex items-center justify-between shadow-lg z-20">
        <span className="font-semibold">Offer Price: ₹{product.currentPrice}</span>
        <Button className="bg-white text-[#009999] hover:bg-gray-100 px-6 py-2 rounded-md font-semibold">
          ADD TO CART
        </Button>
      </div>
      
      <div className="you-may-also-like-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {product.youMayAlsoLike?.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-lg shadow-md overflow-hidden">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm font-medium mt-2">{item.name}</p>
          </div>
        ))}
      </div>
     
      {/* Product Information Section */}
      <ProductInformation product={productInfoData} />
    </div>
  );
}