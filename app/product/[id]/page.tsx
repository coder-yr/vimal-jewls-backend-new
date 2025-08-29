import { Truck, Phone, Gift, Book, CheckCircle } from 'lucide-react'
import ProductDetailClient from "@/components/product-detail-client"
import type { Metadata } from "next"

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
    { src: "/placeholder.svg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Front" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Side" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Elenai Gold Hoop Earrings On Ear" },
    { src: "/placeholder.svg?height=400&width=400", alt: "Elenai Gold Hoop Earrings Dimensions" },
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
  metalDetails: "*A differential amount will be applicable with difference in weight if any.",
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
    },
  ],
}

// Generate metadata for the page (Server Component feature)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params // Await params for metadata generation [^2][^3]
  // In a real app, fetch product details based on id to populate metadata
  const product = productData // Using dummy data for now
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params // Await params for server component [^2][^3]
  return <ProductDetailClient id={id} />
}
