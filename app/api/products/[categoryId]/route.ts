import { farmProducts } from "@/data/farmdata";
import { Product } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    let data: Product[] = [];

    if (params.categoryId === "clothes") {
      // Merge men + women clothes from Fake Store
      const menRes = await fetch("https://fakestoreapi.com/products/category/men's clothing");
      const men = await menRes.json();

      const womenRes = await fetch("https://fakestoreapi.com/products/category/women's clothing");
      const women = await womenRes.json();

      data = [...men, ...women].map((item: Product, idx: number) => ({
        id: `clothes-${idx + 1}`,
        title: item.title,
        price: item.price,
        description: item.description,
        category: "clothes",
        images: [item.image],
      }));
    } else if (params.categoryId === "electronics") {
      const res = await fetch("https://fakestoreapi.com/products/category/electronics");
      const electronics = await res.json();

      data = electronics.map((item: Product, idx: number) => ({
        id: `electronics-${idx + 1}`,
        title: item.title,
        price: item.price,
        description: item.description,
        category: "electronics",
        images: [item.image],
      }));
    } else if (params.categoryId === "farm-products") {
      data = farmProducts;
    } else {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Pagination
    const paginated = data.slice(offset, offset + limit);

    if (paginated.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }

    return NextResponse.json(paginated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}