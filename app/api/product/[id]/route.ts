import { farmProducts } from "@/data/farmdata";
import { Product } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // note: params is a Promise
) {
  try {
    const { id } = await context.params; // await the promise

    if (id.startsWith("farm-")) {
      const product = farmProducts.find((p) => p.id === id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json(product);
    } else {
      // Numeric ID for Fake Store API
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      const data: Product = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
