export const runtime = "nodejs"; // ✅ Add this as the first line

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // expire immediately
    path: "/",
  });
  return res;
}
