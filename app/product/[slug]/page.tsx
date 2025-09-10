import { fetchProductBySlug } from "@/lib/api";
import ProductDetailClient from "@/components/product-detail-client";
import type { Metadata } from "next";

type Props = {
  params: { slug: string }
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);
  return {
    title: product?.name || "Product Not Found",
    description: product?.description || "No product description available.",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
