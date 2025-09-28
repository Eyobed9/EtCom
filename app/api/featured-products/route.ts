import { NextResponse } from "next/server";
import { Product } from "@/interfaces";

export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=12");
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
    }

    const data: Product[] = await res.json();
    const formatted = data.map((item) => ({
      ...item,
      images: [item.image].filter((img): img is string => !!img),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
