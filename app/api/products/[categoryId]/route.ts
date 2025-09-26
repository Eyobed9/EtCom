import { Product, Params } from "@/interfaces";

export async function GET(request: Request, { params }: Params) {
	try {
		const { searchParams } = new URL(request.url);
		const offset = Number(searchParams.get("offset")) || 0;
		const limit = Number(searchParams.get("limit")) || 10;

		// Call the external Fake Store API
		const res = await fetch(
			`https://api.escuelajs.co/api/v1/categories/${params.categoryId}/products?offset=${offset}&limit=${limit}`,
			{ cache: "no-store" } // optional: ensures fresh data each time
		);

		// If the external API fails (404, 500, etc.)
		if (!res.ok) {
			return Response.json(
				{ error: `Failed to fetch products for category ${params.categoryId}` },
				{ status: res.status }
			);
		}

		const data: Product[] = await res.json();

		// If API returned an empty array
		if (!data || data.length === 0) {
			return Response.json(
				{ message: "No products found in this category" },
				{ status: 404 }
			);
		}

		// Success
		return Response.json(data, { status: 200 });
	} catch (error) {
		console.error("API Error:", error);
		return Response.json(
			{ error: "Internal Server Error. Please try again later." },
			{ status: 500 }
		);
	}
}
