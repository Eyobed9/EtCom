import { Product, Params } from "@/interfaces";

export async function GET(request: Request, { params }: Params) {
	const { searchParams } = new URL(request.url);
	const offset = Number(searchParams.get("offset")) || 0;
	const limit = Number(searchParams.get("limit")) || 10;

	const res = await fetch(
		`https://api.escuelajs.co/api/v1/categories/${params.categoryId}/products?offset=${offset}&limit=${limit}`
	);
	const data: Product[] = await res.json();

	return Response.json(data);
}
