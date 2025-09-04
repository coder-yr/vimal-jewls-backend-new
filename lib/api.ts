// lib/api.ts
// Mock API for product fetching. Replace with real API/database logic as needed.

// Example product data (move this to a DB or real API in production)
const products = [
  {
    id: "elenai-gold-hoop-earrings",
    name: "Elenai Gold Hoop Earrings",
    description: "Make a statement with the Elenai Gold Hoop Earrings, designed in 14k gold. These earrings bring volume and edge to your look without compromising comfort.",
    currentPrice: "12,463",
    originalPrice: "13,552",
    rating: 4.7,
    reviews: 54,
    images: [
      { src: "https://www.candere.com/media/catalog/product/L/C/LCE0548_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Elenai Gold Hoop Earrings Front" },
    ],
    badges: ["OUR PICK"],
    youMayAlsoLike: [],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" },
    ],
    productSummary: {
      styleNo: "GE01005",
      width: "0.25 cm (2.50 mm)",
      height: "1.6 cm (16.00 mm)",
      metalWeight: "1.51g",
      grossWeight: "1.51g",
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any.",
  },
  {
    id: "diamond-heart-pendant",
    name: "Diamond Heart Pendant",
    description: "A beautiful heart-shaped pendant encrusted with diamonds, perfect for special occasions or daily elegance.",
    currentPrice: "35,000",
    originalPrice: "40,000",
    rating: 4.8,
    reviews: 30,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/KC03591__1.jpeg", alt: "Diamond Heart Pendant" }
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [
      { id: "classic-solitaire-ring", name: "Classic Solitaire Ring" },
      { id: "elenai-gold-hoop-earrings", name: "Elenai Gold Hoop Earrings" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "PEND1234",
      width: "1.2 cm",
      height: "2.0 cm",
      metalWeight: "2.10g",
      grossWeight: "2.10g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "floral-gold-ring",
    name: "Floral Gold Ring",
    description: "A floral-inspired gold ring, beautifully crafted for elegance and daily wear.",
    currentPrice: "22,000",
    originalPrice: "24,000",
    rating: 4.5,
    reviews: 20,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/KC01124__1.jpeg", alt: "Floral Gold Ring" }
    ],
    badges: ["TRENDING"],
    youMayAlsoLike: [
      { id: "classic-solitaire-ring", name: "Classic Solitaire Ring" },
      { id: "diamond-heart-pendant", name: "Diamond Heart Pendant" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "RNG002",
      width: "0.18 cm",
      height: "0.45 cm",
      metalWeight: "2.0g",
      grossWeight: "2.0g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "gold-chain-with-pearl",
    name: "Gold Chain with Pearl",
    description: "Elegant gold chain featuring a single lustrous pearl, perfect for any occasion.",
    currentPrice: "18,000",
    originalPrice: "20,000",
    rating: 4.6,
    reviews: 18,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C019604_1_1.jpeg", alt: "Gold Chain with Pearl" }
    ],
    badges: ["LIMITED DEAL"],
    youMayAlsoLike: [
      { id: "floral-gold-ring", name: "Floral Gold Ring" },
      { id: "diamond-heart-pendant", name: "Diamond Heart Pendant" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "CHN001",
      width: "0.15 cm",
      height: "1.8 cm",
      metalWeight: "2.2g",
      grossWeight: "2.3g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    description: "A classic tennis bracelet set with sparkling diamonds in a sleek gold setting.",
    currentPrice: "75,000",
    originalPrice: "85,000",
    rating: 4.9,
    reviews: 25,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/c021371_1.jpeg", alt: "Diamond Tennis Bracelet" }
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [
      { id: "gold-kada-bracelet", name: "Gold Kada Bracelet" },
      { id: "floral-gold-ring", name: "Floral Gold Ring" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "BR001",
      width: "0.3 cm",
      height: "18.0 cm",
      metalWeight: "7.5g",
      grossWeight: "7.7g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "gold-kada-bracelet",
    name: "Gold Kada Bracelet",
    description: "Traditional gold kada bracelet with intricate design, perfect for festive occasions.",
    currentPrice: "45,000",
    originalPrice: "50,000",
    rating: 4.7,
    reviews: 15,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/KC06407PLT_2.jpeg", alt: "Gold Kada Bracelet" }
    ],
    badges: ["TRENDING"],
    youMayAlsoLike: [
      { id: "diamond-tennis-bracelet", name: "Diamond Tennis Bracelet" },
      { id: "floral-gold-ring", name: "Floral Gold Ring" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "KADA001",
      width: "0.5 cm",
      height: "6.0 cm",
      metalWeight: "10.0g",
      grossWeight: "10.2g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "round-solitaire-diamond-ring",
    name: "Round Solitaire Diamond Ring",
    description: "A stunning round solitaire diamond ring set in gold, a timeless piece for any collection.",
    currentPrice: "1,20,000",
    originalPrice: "1,30,000",
    rating: 4.9,
    reviews: 60,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C003558__1.jpg", alt: "Round Solitaire Diamond Ring" }
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [
      { id: "princess-cut-solitaire-pendant", name: "Princess Cut Solitaire Pendant" },
      { id: "classic-solitaire-ring", name: "Classic Solitaire Ring" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "RNG003",
      width: "0.22 cm",
      height: "0.55 cm",
      metalWeight: "2.3g",
      grossWeight: "2.3g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "princess-cut-solitaire-pendant",
    name: "Princess Cut Solitaire Pendant",
    description: "A princess cut solitaire diamond pendant, elegant and modern.",
    currentPrice: "90,000",
    originalPrice: "98,000",
    rating: 4.8,
    reviews: 40,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C022020_1.jpeg", alt: "Princess Cut Solitaire Pendant" }
    ],
    badges: ["LIMITED DEAL"],
    youMayAlsoLike: [
      { id: "round-solitaire-diamond-ring", name: "Round Solitaire Diamond Ring" },
      { id: "diamond-heart-pendant", name: "Diamond Heart Pendant" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "PEND5678",
      width: "1.1 cm",
      height: "2.1 cm",
      metalWeight: "2.0g",
      grossWeight: "2.0g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "traditional-gold-mangalsutra",
    name: "Traditional Gold Mangalsutra",
    description: "Traditional gold mangalsutra with black beads and gold pendant.",
    currentPrice: "60,000",
    originalPrice: "65,000",
    rating: 4.7,
    reviews: 22,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/K000730_1.jpg", alt: "Traditional Gold Mangalsutra" }
    ],
    badges: ["TRENDING"],
    youMayAlsoLike: [
      { id: "diamond-mangalsutra-pendant", name: "Diamond Mangalsutra Pendant" },
      { id: "floral-gold-ring", name: "Floral Gold Ring" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "MANG001",
      width: "0.4 cm",
      height: "18.0 cm",
      metalWeight: "8.0g",
      grossWeight: "8.2g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "diamond-mangalsutra-pendant",
    name: "Diamond Mangalsutra Pendant",
    description: "A mangalsutra pendant set with diamonds for a modern yet traditional look.",
    currentPrice: "70,000",
    originalPrice: "78,000",
    rating: 4.8,
    reviews: 18,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/KC06617RG_1.jpg", alt: "Diamond Mangalsutra Pendant" }
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [
      { id: "traditional-gold-mangalsutra", name: "Traditional Gold Mangalsutra" },
      { id: "princess-cut-solitaire-pendant", name: "Princess Cut Solitaire Pendant" }
    ],
    includedWithPurchase: [
      { icon: "Gift", text: "Gift Box" },
      { icon: "Book", text: "Care Tips" },
      { icon: "CheckCircle", text: "Jewellery Certificate" },
      { icon: "Phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "MANG002",
      width: "0.35 cm",
      height: "2.2 cm",
      metalWeight: "3.0g",
      grossWeight: "3.1g"
    },
    metalDetails: "*A differential amount will be applicable with difference in weight if any."
  },
  {
    id: "classic-solitaire-ring",
    name: "Classic Solitaire Ring",
    description: "A timeless classic solitaire ring with a brilliant diamond set in 18k gold. Perfect for engagements or special occasions.",
    currentPrice: "50,000",
    originalPrice: "55,000",
    rating: 4.9,
    reviews: 50,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/KC05017YG_1.jpeg", alt: "Classic Solitaire Ring Front" },
      { src: "https://www.candere.com/media/jewellery/videos/KC05017RG_hand_creative_video.mp4", type: "video", alt: "Classic Solitaire Ring Video" },
      { src: "https://www.candere.com/media/jewellery/images/KC05017RG_Hand_creative.jpeg", alt: "Classic Solitaire Ring Side" },
      { src: "https://www.candere.com/media/jewellery/images/KC05017YG_2.jpeg", alt: "Classic Solitaire Ring Hand" },
      { src: "https://www.candere.com/media/jewellery/images/KC05017YG_5.jpeg", alt: "Classic Solitaire Ring Hand" },
      { src: "https://www.candere.com/media/jewellery/images/KC05017RG_Creative.jpeg", alt: "Classic Solitaire Ring Hand" },
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [],
    includedWithPurchase: [
      { icon: "Gift", text: "Gift Box" },
      { icon: "Book", text: "Care Tips" },
      { icon: "CheckCircle", text: "Jewellery Certificate" },
      { icon: "Phone", text: "24x7 Customer Support" },
    ],
    productSummary: {
      styleNo: "RNG001",
      width: "0.2 cm",
      height: "0.5 cm",
      metalWeight: "2.1g",
      grossWeight: "2.1g",
    },
    metalDetails: "18k gold, diamond center stone.",
  },
  {
    id: "chandrak-diamond-stud-earrings",
    name: "Chandrak Diamond Stud Earrings",
    description: "Diamond stud earrings with a unique Chandrak design.",
    currentPrice: "33,626",
    originalPrice: "38,480",
    rating: 4.7,
    reviews: 3,
    images: [
      { src: "https://www.candere.com/media/catalog/product/C/0/C025332_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Chandrak Diamond Stud Earrings" },
    ],
    badges: ["TRENDING"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "scallop-gold-earrings",
    name: "Scallop Gold Earrings",
    description: "Scallop design gold earrings.",
    currentPrice: "20,396",
    originalPrice: "21,867",
    rating: 4.8,
    reviews: 28,
    images: [
      { src: "https://www.candere.com/media/catalog/product/C/0/C014254__1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Scallop Gold Earrings" },
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "feather-scape-peacock-gold-and-gemstone-earrings",
    name: "Feather Scape Peacock Gold And Gemstone Earrings",
    description: "Peacock inspired gold and gemstone earrings.",
    currentPrice: "21,934",
    originalPrice: "23,837",
    rating: 4.8,
    reviews: 26,
    images: [
      { src: "https://www.candere.com/media/catalog/product/C/0/C022090_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Feather Scape Peacock Gold And Gemstone Earrings" },
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "splinter-diamond-stud-earrings",
    name: "Splinter Diamond Stud Earrings",
    description: "Splinter design diamond stud earrings.",
    currentPrice: "37,703",
    originalPrice: "43,085",
    rating: 4.6,
    reviews: 5,
    images: [
      { src: "https://www.candere.com/media/catalog/product/K/C/KC03978__1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Splinter Diamond Stud Earrings" },
    ],
    badges: ["LIMITED DEAL"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "black-enamel-diamond-earrings",
    name: "Black Enamel Diamond Earrings",
    description: "Black enamel diamond earrings.",
    currentPrice: "25,000",
    originalPrice: "28,000",
    rating: 4.5,
    reviews: 10,
    images: [
      { src: "https://www.candere.com/media/catalog/product/L/C/LCE0485_1.jpeg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Black Enamel Diamond Earrings" },
    ],
    badges: ["BESTSELLER"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "dangling-diamond-hoop-earrings",
    name: "Dangling Diamond Hoop Earrings",
    description: "Dangling diamond hoop earrings.",
    currentPrice: "30,500",
    originalPrice: "35,000",
    rating: 4.7,
    reviews: 15,
    images: [
      { src: "https://www.candere.com/media/catalog/product/C/0/C022008_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=360&width=360&canvas=360:360", alt: "Dangling Diamond Hoop Earrings" },
    ],
    badges: ["LIMITED DEAL"],
    youMayAlsoLike: [],
    includedWithPurchase: [],
    productSummary: {},
    metalDetails: "",
  },
  {
    id: "diamond-nose-pin",
    name: "Diamond Nose Pin",
    description: "A delicate nose pin featuring a sparkling diamond, perfect for everyday elegance and special occasions.",
    currentPrice: "8,500",
    originalPrice: "10,000",
    rating: 4.6,
    reviews: 22,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/C007029__1.jpeg", alt: "Diamond Nose Pin Front" },
      { src: "https://www.candere.com/media/jewellery/images/C007029__6.jpeg", alt: "Diamond Nose Pin Side" }
    ],
    badges: ["POPULAR", "TRENDING"],
    youMayAlsoLike: [
      { id: "elenai-gold-hoop-earrings", name: "Elenai Gold Hoop Earrings" },
      { id: "diamond-heart-pendant", name: "Diamond Heart Pendant" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "NP00123",
      width: "0.2 cm",
      height: "0.2 cm",
      metalWeight: "0.5g",
      grossWeight: "0.5g",
    },
    metalDetails: "*Actual weight may vary slightly due to manual craftsmanship.",
  },
  {
    id: "gold-toe-ring",
    name: "Gold Toe Ring",
    description: "Traditional gold toe ring crafted for comfort and style, perfect for daily wear or festive occasions.",
    currentPrice: "3,200",
    originalPrice: "4,000",
    rating: 4.5,
    reviews: 18,
    images: [
      { src: "https://www.candere.com/media/jewellery/images/LCR0579_1.jpeg", alt: "Gold Toe Ring Front" },
      { src: "https://www.candere.com/media/jewellery/images/LCR0581_Creative.jpeg", alt: "Gold Toe Ring Side" }
    ],
    badges: ["TRADITIONAL", "BESTSELLER"],
    youMayAlsoLike: [
      { id: "diamond-nose-pin", name: "Diamond Nose Pin" },
      { id: "elenai-gold-hoop-earrings", name: "Elenai Gold Hoop Earrings" }
    ],
    includedWithPurchase: [
      { icon: "gift", text: "Gift Box" },
      { icon: "book", text: "Care Tips" },
      { icon: "check-circle", text: "Jewellery Certificate" },
      { icon: "phone", text: "24x7 Customer Support" }
    ],
    productSummary: {
      styleNo: "TR00111",
      width: "0.3 cm",
      height: "0.3 cm",
      metalWeight: "1.0g",
      grossWeight: "1.0g",
    },
    metalDetails: "*Weight may vary slightly due to manual craftsmanship.",
  },
];

export async function fetchProductById(id: string) {
  // Simulate async fetch
  return products.find((p) => p.id === id) || null;
}
