import { Category } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data: string[] = await res.json();

  const categories: Category[] = [];

  // Add electronics
  if (data.includes("electronics")) {
    categories.push({
      id: "electronics",
      name: "Electronics",
      image: "https://img.icons8.com/fluency/96/iphone14-pro.png",
    });
  }

  // Merge clothes
  if (data.includes("men's clothing") || data.includes("women's clothing")) {
    categories.push({
      id: "clothes",
      name: "Clothes",
      image: "https://img.icons8.com/fluency/96/t-shirt.png",
    });
  }

  // Add custom farm
  categories.push({
    id: "farm-products",
    name: "Farm Products",
    image: "https://img.icons8.com/fluency/96/cabbage.png",
  });

  return NextResponse.json(categories);
}