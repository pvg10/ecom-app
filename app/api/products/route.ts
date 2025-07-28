import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
// import { getTokenPayload } from "@/lib/auth";


export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, price, category, gender, image } = body;

    // 🧠 Log to debug if needed
    console.log("BODY:", body);

    const product = await Product.create({
      name,
      price,
      category,
      gender,
      image, // ✅ Make sure this is passed
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
