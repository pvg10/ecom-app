export const runtime = "nodejs"; // ✅ Add this as the first line

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

import bcrypt from "bcryptjs"; // ✅ Add this at the top

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials (user not found)" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ✅ Bcrypt comparison

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials (wrong password)" }, { status: 401 });
    }

    const token = await signToken({ userId: user._id.toString() });

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
