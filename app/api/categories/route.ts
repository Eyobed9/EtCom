import { Category } from "@/interfaces"

export async function GET() {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories')
    const data: Category[] = await res.json()
    return Response.json(data)
}