"use client";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "/products";
    } else {
      const data = await res.json();
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 via-slate-700 to-blue-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 hover:scale-[1.01] transition"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 drop-shadow">
          Login to Your Dashboard
        </h2>
        <p className="text-center text-gray-500">Secure access to your store</p>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute top-3.5 left-3 text-indigo-500" />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute top-3.5 left-3 text-indigo-500" />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
        >
          🔐 Sign In
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
