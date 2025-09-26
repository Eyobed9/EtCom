"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Category, Product } from "@/interfaces";

export default function CategoriesProductsPage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const limit = isMobile ? 6 : 10;

	// Detect mobile
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Fetch categories

	useEffect(() => {
		setCategories([
			{ id: 1, name: "Clothes", image: "/images/categories/tshirt.svg" },
			{ id: 2, name: "Electronics", image: "/images/categories/iphone.svg" },
			{ id: 3, name: "Farm Products", image: "/images/categories/cabbage.svg" },
		]);
	}, []);

	// Fetch products with error handling
	const fetchProducts = async (categoryId: number, pageNumber: number, append = false) => {
		try {
			setLoading(true);
			const res = await fetch(
				`/api/products/${categoryId}?offset=${pageNumber * limit}&limit=${limit}`
			);
			

			if (!res.ok) {
				const data = await res.json();
				setError(data.error || data.message || "Failed to load products");
				setProducts(append ? products : []);
				return;
			}

			const data: Product[] = await res.json();
			setProducts((prev) => (append ? [...prev, ...data] : data));
			setError(null);
			console.log(products);
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again later.");
			setProducts(append ? products : []);
		} finally {
			setLoading(false);
		}
	};

	// Reload products when category changes
	useEffect(() => {
		if (!selectedCategory) return;
		setPage(0);
		fetchProducts(selectedCategory, 0, false);
	}, [selectedCategory, isMobile]);

	// Desktop pagination
	const handlePageChange = (newPage: number) => {
		if (!selectedCategory) return;
		setPage(newPage);
		fetchProducts(selectedCategory, newPage, false);
	};

	// Mobile infinite scroll
	useEffect(() => {
		if (!isMobile || !selectedCategory) return;

		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 200 &&
				!loading
			) {
				const nextPage = page + 1;
				setPage(nextPage);
				fetchProducts(selectedCategory, nextPage, true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isMobile, page, loading, selectedCategory]);

	return (
		<div className="relative w-full">
			{/* Categories Overlay for Mobile */}
			{isMobile && (
				<div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4">
					<h2 className="text-2xl font-semibold text-midnightblue w-full text-center mb-4">
						Categories
					</h2>

					<div className="grid grid-cols-1 gap-4">
						{categories.map((cat) => (
							<div
								key={cat.id}
								onClick={() => setSelectedCategory(cat.id)}
								className="w-full hover:shadow-lg hover:transform hover:transition-transform duration-300 hover:scale-105 relative h-60 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center"
							>
								<Image
									src={cat.image}
									alt={cat.name}
									fill
									className="object-cover opacity-80"
								/>
								<span className="absolute text-black font-bold text-xl bg-white/50 px-2 py-1 rounded">
									{cat.name}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Categories / Desktop */}
			{!isMobile && (
				<div className="w-full grid grid-cols-3 p-4 place-items-center">
					{categories.map((cat) => (
						<div
							key={cat.id}
							onClick={() => setSelectedCategory(cat.id)}
							className="hover:shadow-lg hover:transform hover:transition-transform duration-300 hover:scale-105 relative h-[400px] w-[400px] rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center"
						>
							<Image
								src={cat.image}
								alt={cat.name}
								fill
								className="object-cover opacity-80"
							/>
							<p className="absolute text-black bg-white/50 font-bold text-lg px-2 py-1 rounded">
								{cat.name}
							</p>
						</div>
					))}
				</div>
			)}

			{/* Products */}
			<div className="p-4">
				{error && <p className="text-red-500 text-center mt-4">{error}</p>}

				{products.length > 0 && (
					<ul
						className={`grid gap-4 ${
							isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
						} mt-4`}
					>
						{products.map((prod) => (
							<li
								key={prod.id}
								className="border border-gray-200 p-4 rounded-xl flex flex-col items-center"
							>
								{prod.images?.[0] && (
									<Image
										src={prod.images[0]}
										alt={prod.title}
										width={150}
										height={150}
										className="rounded-xl object-cover"
									/>
								)}
								<h3 className="mt-2 font-semibold text-center">{prod.title}</h3>
								<p className="text-center font-bold">${prod.price}</p>
							</li>
						))}
					</ul>
				)}

				{/* Desktop Pagination */}
				{!isMobile && selectedCategory && (
					<div className="flex justify-center items-center gap-4 mt-4">
						<button
							disabled={page === 0}
							onClick={() => handlePageChange(page - 1)}
							className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
						>
							Prev
						</button>
						<span>
							Page <strong>{page + 1}</strong>
						</span>
						<button
							onClick={() => handlePageChange(page + 1)}
							className="px-4 py-2 bg-gray-200 rounded"
						>
							Next
						</button>
					</div>
				)}

				{loading && <p className="text-center mt-4">Loading...</p>}
			</div>
		</div>
	);
}
