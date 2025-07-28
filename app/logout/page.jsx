// app/logout/page.tsx
"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Clear cookie by calling logout API route
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "/login";
    });
  }, []);

  return <p className="text-center mt-10 text-pink-600">Logging you out...</p>;
}
