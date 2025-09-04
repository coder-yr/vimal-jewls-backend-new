"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function ProductDetailClient({ product }: { product: any }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.images[0].src);
  const [imageSlots, setImageSlots] = useState<(string | null)[]>([null, null, null]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number.parseFloat(product.currentPrice.replace(/,/g, "")),
        quantity: 1,
        image: product.images[0].src,
        metal: "14K Yellow Gold (1.51g)", // Mock metal detail
      })
    );
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number.parseFloat(product.currentPrice.replace(/,/g, "")),
        quantity: 1,
        image: product.images[0].src,
        metal: "14K Yellow Gold (1.51g)", // Mock metal detail
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
        / <span className="font-semibold">{product.name}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Left Section - Product Images */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {product.images.map((item, idx) => (
              item.type === "video" ? (
                <video
                  key={idx}
                  controls
                  className="object-contain rounded-lg w-full"
                  width={500}
                  height={500}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Zoom key={idx}>
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt || "Product Image"}
                    width={500}
                    height={500}
                    className="object-contain rounded-lg w-full"
                  />
                </Zoom>
              )
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
            {product.badges.map((badge) => (
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
              <Select defaultValue="12">
                <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white">
                  <SelectValue placeholder="12 (16.5 mm)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 (16.5 mm)</SelectItem>
                  <SelectItem value="13">13 (17.0 mm)</SelectItem>
                  <SelectItem value="14">14 (17.5 mm)</SelectItem>
                </SelectContent>
              </Select>
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
      <main className="container mx-auto px-4 py-10">
        <SectionHeader title="Product Information" underlineClassName="bg-teal-500" />
        <div className="mt-10 grid gap-8 md:grid-cols-[320px,1fr]">
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <Image src={product.images[0]?.src || "/placeholder.svg"} alt={product.images[0]?.alt || product.name} width={80} height={80} className="rounded-lg object-contain" />
              <div>
                <h3 className="font-semibold text-lg mb-2">✨Fashionable Glamour, Sparkling Elegance!</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>
            <ProductSummaryCard
              data={Object.entries(product.productSummary || {}).reduce(
                (acc, [key, value]) => {
                  acc[key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())] =
                    value ? String(value) : "N/A";
                  return acc;
                },
                {}
              )}
              note={<p className="text-xs text-gray-500">*Difference in gold weight may occur & will apply on final price.</p>}
            />
            <HelpCard />
          </div>
          <div>
            <PriceBreakupAccordion
              rows={product.priceBreakup || []}
              grandTotal={product.grandTotal || "N/A"}
              grandCaption="(MRP Incl. of all taxes)"
            />
            <p className="mt-6 text-sm text-muted-foreground">
              *A differential amount will be applicable with difference in weight if any.
            </p>
          </div>
        </div>
      </main>
      <div className="you-may-also-like-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {product.youMayAlsoLike.map((item) => (
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
      <Tabs defaultValue="description" className="mt-8">
        <TabsList className="flex justify-center bg-gray-100 p-2 rounded-lg shadow-md">
          <TabsTrigger value="description" className="px-4 py-2 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-teal-500">
            <span className="flex items-center gap-2">
              <Book className="w-4 h-4" /> Description
            </span>
          </TabsTrigger>
          <TabsTrigger value="specifications" className="px-4 py-2 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-teal-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Specifications
            </span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="px-4 py-2 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-teal-500">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4" /> Reviews
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="p-4 bg-white rounded-lg shadow-md">
          <ul className="space-y-2">
            {Object.entries(product.productSummary || {}).map(([key, value]) => (
              <li key={key} className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>
                  <strong>{key}:</strong> {String(value)}
                </span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 bg-white rounded-lg shadow-md">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, idx) => (
                <div key={idx} className="border-b py-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${starIdx < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <p className="text-xs text-gray-500">- {review.author}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}