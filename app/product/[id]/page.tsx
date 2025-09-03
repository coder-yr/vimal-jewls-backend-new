import ProductDetailClient from "@/components/product-detail-client";
import type { Metadata } from "next";
import { fetchProductById } from "@/lib/api";

// Generate metadata for the page (Server Component feature)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);
  return {
    title: product?.name || "Product Not Found",
    description: product?.description || "No product description available.",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);
  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }
  return <ProductDetailClient product={product} />;
}
