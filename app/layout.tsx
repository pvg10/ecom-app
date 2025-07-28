import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart, FaThLarge, FaBoxOpen } from "react-icons/fa";

export const metadata = {
  title: "Ecom Partial",
  description: "E-commerce App with Login + Product",
};

export default function RootLayout({ children }) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html lang="en">
      <head>        <link rel="icon" href="/favicon.ico" />
</head>
      <body className="bg-slate-100 text-gray-900 min-h-screen font-sans tracking-wide">
        {!isAuthPage && (
          <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-slate-800 to-blue-900 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-wider drop-shadow-md">
                🛒 E-Shop
              </h1>
              <nav className="flex gap-3 items-center">
                <Link
                  href="/categories"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition text-sm font-medium shadow"
                >
                  <FaThLarge /> Categories
                </Link>

                <Link
                  href="/products"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition text-sm font-medium shadow"
                >
                  <FaBoxOpen /> Products
                </Link>

                <Link
                  href="/cart"
                  className="relative flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 transition text-sm font-medium shadow"
                >
                  <FaShoppingCart />
                  Cart
                  {/* Badge - replace 3 with actual cart count */}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                    0
                  </span>
                </Link>

                <Link
                  href="/logout"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition text-sm font-medium shadow"
                >
                  🚪 Logout
                </Link>
              </nav>

            </div>
          </header>

        )}

        <main className="min-h-[80vh] px-4 py-6">{children}</main>

        {!isAuthPage && (
          <footer className="bg-slate-900 text-slate-300 text-center py-4 mt-10 shadow-inner">
            <div className="text-sm tracking-wide">
              © {new Date().getFullYear()} E-Commerce Inc. · All rights reserved
            </div>
            <div className="text-xs mt-1 text-slate-400">
              Crafted with ❤️ using Next.js & Tailwind CSS
            </div>
          </footer>
        )}
      </body>
    </html>
  );
}
