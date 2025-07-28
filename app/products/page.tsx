"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-slate-700 to-blue-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-10 text-center drop-shadow">
          🛍️ Shop the Collection
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    p.image ||
                    "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                  }
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{p.name}</h3>
                <p className="text-indigo-600 font-bold text-lg">₹{p.price}</p>
                <p className="text-gray-500 text-sm capitalize">
                  {p.category} • {p.gender}
                </p>
                <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition">
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
