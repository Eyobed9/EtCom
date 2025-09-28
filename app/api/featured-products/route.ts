import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/interfaces";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 6;

    const res = await fetch("https://fakestoreapi.com/products?limit=12");
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
    }

    const data: Product[] = await res.json();
    const formatted = data.map(item => ({
      ...item,
      images: item.image ? [item.image] : [],
    }));

    const paginated = formatted.slice(offset, offset + limit);

    return NextResponse.json({
      products: paginated,
      hasMore: offset + limit < formatted.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
