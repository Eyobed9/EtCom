"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/interfaces";
import BlueButton from "@/components/Common/BlueButton";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (<div className="flex justify-center items-center mt-6">
							<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
							<p className="text-center text-gray-700 font-medium">
								Loading...
							</p>
						</div>);
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-4">Product not found</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <button
        onClick={() => router.back()}
        className="px-4 py-2 mb-4 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 relative h-96">
          <Image
            src={product.images?.[0] || product.image || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-contain rounded-lg bg-gray-100 p-4"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-xl text-gray-700">{product.price} ETB</p>
            <p className="text-yellow-500">
                {product.rating?.rate ?? 0} ★ ({product.rating?.count ?? 0} reviews)
            </p>
            <p className="text-gray-600">{product.description}</p>
            <BlueButton text={"Add to cart"} />
        </div>
      </div>
    </div>
  );
}
