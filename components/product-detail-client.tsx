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
];

export default function ProductDetailClient({ id }: { id: string }) {
  // In a real application, you would fetch product data based on id
  // For this example, we're using static dummyData

  
  const router = useRouter();
  const product = products.find((p) => p.id === id) || products[1]; // Fallback to first product if not found
  const [selectedImage, setSelectedImage] = useState(product.images[0].src);
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
    alert("Added to cart!");
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
        {/* Left Section - Product Images */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src={selectedImage || "/placeholder.svg"} // Main image
              alt={product.images[0].alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`relative w-full aspect-square border  rounded-lg overflow-hidden cursor-pointer hover:border-[#009999] ${
                  selectedImage === img.src ? "border-2 border-[#FADDA0]" : ""
                }`}
                onClick={() => setSelectedImage(img.src)}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *Difference in gold weight may occur & will apply on final price.
          </p>
        </div>

        {/* Right Section - Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-red-500 font-semibold">
            {product.inDemand}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span>{product.rating}</span>
              <span className="ml-1">({product.reviews})</span>
            </div>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-gray-900"
            >
              View Details <ChevronDown className="ml-1 w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5 text-gray-700" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="w-5 h-5 text-gray-700" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  badge === "OUR PICK"
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#009999]">
              ₹{product.currentPrice}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
          <p className="text-sm text-green-600 font-medium">
            YOU SAVE: ₹{product.youSave}
          </p>
          <Link href="#" className="text-sm text-[#009999] hover:underline">
            Notify me When Price Drops
          </Link>

          <div className="flex gap-4 mt-4">
            <Button
              className="bg-[#009999] text-white hover:bg-[#007a7a] px-8 py-3 rounded-md font-semibold"
              onClick={handleBuyNow}
            >
              BUY NOW
            </Button>
            <Button
              variant="outline"
              className="border-[#009999] text-[#009999] hover:bg-[#e0f2f2] bg-transparent px-8 py-3 rounded-md font-semibold"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex items-start gap-3">
            <Truck className="w-6 h-6 text-gray-700 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">
                Free Shipping by Today
              </p>
              <p className="text-sm text-gray-600">
                Order within 09:43:41 to enjoy 24-hours shipping!
              </p>
              <Link href="#" className="text-xs text-[#009999] hover:underline">
                T&C Apply
              </Link>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Sizing & Selection */}
          <h2 className="text-xl font-bold text-gray-900 relative pb-2">
            Sizing & Selection
            <span className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-[#009999]"></span>
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="customization"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Customization
              </label>
              <Select defaultValue="14k-yellow-gold">
                <SelectTrigger className="w-full rounded-md border border-gray-300 bg-white">
                  <SelectValue placeholder="14k Yellow Gold - In Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14k-yellow-gold">
                    14k Yellow Gold - In Stock
                  </SelectItem>
                  <SelectItem value="18k-yellow-gold">
                    18k Yellow Gold - In Stock
                  </SelectItem>
                  <SelectItem value="22k-yellow-gold">
                    22k Yellow Gold - In Stock
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Virtual Try On */}
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Virtual Try On</h3>
              <p className="text-sm text-gray-600">
                Try your favorite design now from your own device.
              </p>
            </div>
            <Button className="bg-[#009999] text-white px-6 py-2 rounded-md flex items-center gap-2">
              <Camera className="w-5 h-5" /> Try Now
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full border-[#009999] text-[#009999] hover:bg-[#e0f2f2] bg-transparent"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> CHAT WITH EXPERTS
          </Button>

          <Separator className="my-4" />

          {/* Delivery or Instore pickup */}
          <h2 className="text-xl font-bold text-gray-900 relative pb-2">
            Delivery or Instore pickup
            <span className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-[#009999]"></span>
          </h2>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="302006"
              className="flex-grow rounded-md border border-gray-300 px-4 py-2"
            />
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 px-4 py-2 rounded-md bg-transparent"
            >
              Locate Me
            </Button>
          </div>
          <p className="text-sm text-gray-600">Expected Delivery Date</p>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="store-1">
              <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline">
                Jaipur Tonk Road{" "}
                <span className="ml-auto text-gray-500">3km</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed space-y-2">
                <Link href="#" className="text-[#009999] hover:underline">
                  Show Store Details
                </Link>
                <div className="flex items-center justify-between">
                  <span>14k Yellow Gold - In Stock</span>
                  <span className="text-red-500">X (Unavailable)</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#009999] text-[#009999] bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" /> CALL 9660013363
                  </Button>
                  <Button className="flex-1 bg-green-500 text-white hover:bg-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" /> WHATSAPP
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="store-2">
              <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline">
                Jaipur Vaishali Nagar{" "}
                <span className="ml-auto text-gray-500">4km</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed space-y-2">
                <Link href="#" className="text-[#009999] hover:underline">
                  Show Store Details
                </Link>
                <div className="flex items-center justify-between">
                  <span>14k Yellow Gold - In Stock</span>
                  <span className="text-red-500">X (Unavailable)</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#009999] text-[#009999] bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" /> CALL 8233660633
                  </Button>
                  <Button className="flex-1 bg-green-500 text-white hover:bg-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" /> WHATSAPP
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Product Information */}
      <section className="bg-gray-50 py-8 px-4 md:px-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Product Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={product.images[0].src}
                alt="Product Thumbnail"
                width={64}
                height={64}
                className="object-contain"
              />
              <p className="text-lg font-semibold text-gray-800">
                Statement Gold Hoops For Women!
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="product-summary">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Product Summary
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                  <div className="grid grid-cols-2 gap-2">
                    <span>Style No.</span>
                    <span className="font-medium">
                      {product.productSummary.styleNo}
                    </span>
                    <span>Width</span>
                    <span className="font-medium">
                      {product.productSummary.width}
                    </span>
                    <span>Height</span>
                    <span className="font-medium">
                      {product.productSummary.height}
                    </span>
                    <span>Metal Weight</span>
                    <span className="font-medium">
                      {product.productSummary.metalWeight}
                    </span>
                    <span>Gross Weight</span>
                    <span className="font-medium">
                      {product.productSummary.grossWeight}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Difference in gold weight & will apply on final price.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="metal-details">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                  Metal Details
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                  {product.metalDetails}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-gray-800 mb-2">
                Need help to find the best jewellery for you ?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We are available for your assistance
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-1 text-gray-700 bg-transparent"
                >
                  <Phone className="w-6 h-6" />
                  <span className="text-xs">Speak with Experts</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-1 text-gray-700 bg-transparent"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs">Chat with Experts</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You may also like */}
      <section className="bg-white py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold mb-2">You may also like</h2>
        <p className="text-gray-600 mb-12">Discover More Favourites</p>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
            {product.youMayAlsoLike.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden relative group"
              >
                {item.badge && (
                  <div
                    className={`absolute top-0 left-0 px-3 py-1 text-xs font-semibold text-white rounded-br-lg ${
                      (item.badge === "TRENDING" && "bg-pink-500") ||
                      (item.badge === "BESTSELLER" && "bg-purple-500") ||
                      (item.badge === "LIMITED DEAL" && "bg-orange-500") ||
                      "bg-indigo-500"
                    }`}
                  >
                    {item.badge === "TRENDING" && (
                      <TrendingUp className="inline-block w-3 h-3 mr-1" />
                    )}
                    {item.badge === "BESTSELLER" && (
                      <Crown className="inline-block w-3 h-3 mr-1" />
                    )}
                    {item.badge === "LIMITED DEAL" && (
                      <Clock className="inline-block w-3 h-3 mr-1" />
                    )}
                    {item.badge}
                  </div>
                )}
                <Image
                  src={`${item.image}`}
                  alt={item.name}
                  width={256}
                  height={256}
                  className="object-contain w-full h-64 p-4"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-[#009999]">
                      ₹{item.currentPrice}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice}
                    </div>
                  </div>
                  <p className="text-sm text-green-600 font-medium mb-2">
                    {item.discount}
                  </p>
                  <h3 className="text-base font-medium text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span>{item.rating}</span>
                    <span className="ml-1">({item.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* What's included with the Purchase? */}
      <section className="bg-[#e0f2f2] py-12 px-4 md:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">
          What&apos;s included with the Purchase ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {product.includedWithPurchase.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-gray-800"
            >
              <item.icon className="w-10 h-10 mb-3 text-[#009999]" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#009999] text-white py-3 px-4 md:px-8 flex items-center justify-between shadow-lg z-20">
        <div className="flex items-center gap-3">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Product Thumbnail"
            width={40}
            height={40}
            className="object-contain rounded-md"
          />
          <span className="font-semibold">{product.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold">
            Offer Price: ₹{product.currentPrice}
          </span>
          <Button
            className="bg-white text-[#009999] hover:bg-gray-100 px-6 py-2 rounded-md font-semibold"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
}
