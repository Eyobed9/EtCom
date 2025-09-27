"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Category, Product } from "@/interfaces";

export default function CategoriesProductsPage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	);
	const [showCategories, setShowCategories] = useState(true);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<string>("default");

	const limit = 6;

	// Detect mobile
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("/api/categories");
				const data: Category[] = await res.json();
				setCategories(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load categories");
			}
		};
		fetchCategories();
	}, []);

	// Handle category click
	const handleCategoryClick = (catId: string) => {
		setSelectedCategory(catId);
		setShowCategories(false);
		setPage(0); // reset to first page
		fetchProducts(catId, 0, false);
	};

	// Fetch products
	const fetchProducts = async (
		categoryId: string,
		pageNumber: number,
		append = false
	) => {
		try {
			setLoading(true);
			const res = await fetch(
				`/api/products/${categoryId}?offset=${
					pageNumber * limit
				}&limit=${limit}`
			);

			if (!res.ok) {
				const data = await res.json();
				setError(
					data.error || data.message || "Failed to load products"
				);
				setProducts(append ? products : []);
				return;
			}

			const data: Product[] = await res.json();

			let sortedData = [...data];
			if (sortOrder == "asc") {
				sortedData.sort((a, b) => a.price - b.price);
			} else if (sortOrder == "desc") {
				sortedData.sort((a, b) => b.price - a.price);
			} else if (sortOrder == "popular") {
				sortData.sort((a,b) => (b.rating?.rate?? 0) - (a.rating?.rate??0))
			}
			setProducts((prev) => (append ? [...prev, ...data] : data));
			setError(null);
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again later.");
			setProducts(append ? products : []);
		} finally {
			setLoading(false);
		}
	};

	// Automatically refetch when page changes (for desktop)
	useEffect(() => {
		if (selectedCategory && !isMobile) {
			fetchProducts(selectedCategory, page, false);
		}
	}, [page, selectedCategory, isMobile]);

	// Refetch products when sorting changes
	useEffect(() => {
		if (selectedCategory) {
			fetchProducts(selectedCategory, 0, false);
		}
	c}, [sortOrder]);

	// Mobile infinite scroll
	useEffect(() => {
		if (!isMobile || !selectedCategory) return;

		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 400 &&
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
			{isMobile && showCategories && (
				<div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4">
					<h2 className="uppercase text-2xl font-semibold text-midnightblue w-full text-center mb-4">
						Categories
					</h2>
					<div className="grid grid-cols-1 gap-4">
						{categories.map((cat) => (
							<div
								key={cat.id}
								onClick={() => handleCategoryClick(cat.id)}
								className="w-full hover:shadow-lg hover:scale-105 transition-transform duration-300 relative h-60 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center"
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
			{!isMobile && showCategories && (
				<div className="flex flex-col gap-2">
					<h2 className="uppercase text-2xl font-semibold text-midnightblue w-full text-center mb-4">
						Categories
					</h2>
					<div className="w-full grid grid-cols-3 max-md:gap-2 p-4 place-items-center">
						{categories.map((cat) => (
							<div
								key={cat.id}
								onClick={() => handleCategoryClick(cat.id)}
								className="hover:shadow-lg hover:scale-105 transition-transform duration-300 relative h-[400px] w-[400px] rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center"
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
				</div>
			)}

			{/* Back to Categories */}
			{!showCategories && (
				<div className="flex justify-center my-4">
					<button
						onClick={() => {
							setShowCategories(true);
							setProducts([]);
							setSelectedCategory(null);
							setError(null);
							setPage(0);
						}}
						className="px-4 py-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 text-xl"
					>
						Back to Categories
					</button>
				</div>
			)}

			{/* Products */}
			<div className="p-4">
				<div className="flex">
				<h2 className="text-2xl uppercase font-semibold text-midnightblue w-full text-center mb-4">
						{selectedCategory}
				</h2>
				<select value={sortOrder} onChange={(e)=> setSortOrder(e.target.value)}>
					<option value="default">Sort by</option>
					<option value="asc">Lowest Price</option>
					<option value="desc">Highest Price</option>
					<option value="popular">Most Popular</option>
				</select>
				</div>
				{products.length > 0 && (
					<div
						className={`grid gap-4 place-items-center ${
							isMobile
								? "grid-cols-1"
								: "grid-cols-2 md:grid-cols-3"
						} mt-4`}
					>
						{products.map((prod) => (
							<div
								key={prod.id}
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
										{prod.price?.toFixed
											? prod.price.toFixed(2)
											: prod.price}{" "}
										ETB
									</p>
									<p className="text-yellow-500 md:text-xl">
										{prod.rating?.rate ?? 0} ★
										<span className="text-black">
											{" "}
											({prod.rating?.count ?? 0} reviews)
										</span>
									</p>
								</div>
							</div>
						))}
					</div>
				)}
				{error && (
					<p className="text-red-800 text-center mt-4">{error}</p>
				)}

				{/* Loading Spinner */}
				{loading && (
					<div className="flex justify-center items-center mt-6">
						<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
						<p className="text-center text-gray-700 font-medium">
							Loading...
						</p>
					</div>
				)}

				{/* Desktop Pagination */}
				{!isMobile && selectedCategory && (
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
							onClick={() => setPage(page + 1)}
							disabled={products.length < limit}
							className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
