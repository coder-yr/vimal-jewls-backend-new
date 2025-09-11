"use client";

import { useEffect, useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistPage() {
  useAuthGuard();
  type Product = {
    id: number;
    name: string;
    images?: { src: string; alt?: string }[];
    shortcode?: string;
    price?: number;
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch("http://localhost:7502/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    await fetch(`http://localhost:7502/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {products.length === 0 && !loading && <div>No products in wishlist.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product: Product) => (
          <Card key={product.id} className="p-4 flex flex-col items-center">
            <img
              src={product.images?.[0]?.src || "/placeholder.svg"}
              alt={product.images?.[0]?.alt || product.name}
              width={120}
              height={120}
              className="object-contain rounded mb-2"
            />
            <div className="font-semibold text-lg mb-1">{product.name}</div>
            <div className="text-sm text-gray-500 mb-2">SKU: {product.shortcode}</div>
            <div className="text-xl font-bold text-yellow-700 mb-4">₹{product.price?.toLocaleString()}</div>
            <Button variant="destructive" onClick={() => handleRemove(product.id)}>
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
