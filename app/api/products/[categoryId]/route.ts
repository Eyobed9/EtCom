import { farmProducts } from "@/data/farmdata";
import { Product } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ categoryId: string }> } // params is a Promise
) {
  try {
    const { categoryId } = await context.params; // await before destructuring
    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;

    let data: Product[] = [];

    if (categoryId === "clothes") {
      const menRes = await fetch("https://fakestoreapi.com/products/category/men's clothing");
      const men = await menRes.json();
      const womenRes = await fetch("https://fakestoreapi.com/products/category/women's clothing");
      const women = await womenRes.json();
      data = [...men, ...women].map((item: Product) => ({
        ...item,
        category: "clothes",
        images: item.image ? [item.image] : [], // ensures string[]
      }));
    } else if (categoryId === "electronics") {
      const res = await fetch("https://fakestoreapi.com/products/category/electronics");
      const electronics = await res.json();
      data = electronics.map((item: Product) => ({
        ...item,
        category: "electronics",
        images: item.image ? [item.image] : [],
      }));
    } else if (categoryId === "farm-products") {
      data = farmProducts.map((item): Product => ({
        ...item,
        rating:
          typeof item.rating === "number"
            ? { rate: item.rating, count: 0 }
            : item.rating,
        images: item.images || [],
      }));
    } else {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const paginated = data.slice(offset, offset + limit);
    if (paginated.length === 0) {
      return NextResponse.json({ message: "No more products found" }, { status: 404 });
    }

    return NextResponse.json(paginated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
