export const runtime = "nodejs"; // ✅ Add this as the first line

import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

// GET a single product (optional)
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

// PUT (replace entire product)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// PATCH (partial update)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(params.id, { $set: body }, { new: true });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Product.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted", id: params.id });
}
