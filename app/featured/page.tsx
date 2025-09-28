"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/interfaces";

export default function FeaturedProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const limit = 6;
  const router = useRouter();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch featured products
  const fetchFeatured = async (pageNumber: number, append = false) => {
    if (!hasMore && append) return;

    try {
      setLoading(true);
      const res = await fetch(
        `/api/featured-products?offset=${pageNumber * limit}&limit=${limit}`
      );
      if (!res.ok) throw new Error("Failed to load featured products");
      const data = await res.json();

      setProducts(prev =>
        append ? [...prev, ...data.products] : data.products
      );
      setHasMore(data.hasMore);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchFeatured(0, false);
  }, []);

  // Desktop Pagination (page changes)
  useEffect(() => {
    if (!isMobile) {
      fetchFeatured(page, false);
    }
  }, [page, isMobile]);

  // Mobile Infinite Scroll
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 400 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchFeatured(nextPage, true); // Always append
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, page, loading, hasMore]);

  const handleProductClick = (id: string | number) => {
    router.push(`/product/${id.toString()}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center uppercase font-semibold text-midnightblue mb-4">
        Featured Products
      </h2>

      {error && <p className="text-red-800 text-center mb-4">{error}</p>}

      <div
        className={`grid gap-4 place-items-center ${
          isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
        }`}
      >
        {products.map(prod => (
          <div
            key={prod.id}
            onClick={() => handleProductClick(prod.id)}
            className="flex flex-col gap-2 w-[215px] md:w-[310px] mb-3 cursor-pointer hover:bg-gray-100 rounded-2xl p-2 hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="w-[198px] h-[198px] md:w-[295px] md:h-[295px] relative">
              <Image
                src={prod.images?.[0] || prod.image!}
                alt={prod.title}
                fill
                sizes="100vw"
                className="rounded-[20px] object-contain bg-gray-100 p-3"
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <h3 className="text-sm font-semibold md:text-xl line-clamp-2">
                {prod.title}
              </h3>
              <p className="text-gray-600 md:text-xl">
                {prod.price?.toFixed?.(2) || prod.price} ETB
              </p>
              <p className="text-yellow-500 md:text-xl">
                {prod.rating?.rate ?? 0} ★{" "}
                <span className="text-black">
                  ({prod.rating?.count ?? 0} reviews)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
          <p className="text-center text-gray-700 font-medium">Loading...</p>
        </div>
      )}

      {/* Desktop Pagination */}
      {!isMobile && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page <strong>{page + 1}</strong>
          </span>
          <button
            disabled={!hasMore}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
