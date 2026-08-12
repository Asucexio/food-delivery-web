"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import {
  LogOut, User, ShoppingCart, ChefHat, Truck, Home,
  ClipboardList, Store, Menu, X
} from "lucide-react";

// Matches the palette used across the site:
// ink #2A1C14, berbere #A5311F, turmeric #C68A2E, parchment #FAF5EC

type NavLink = { href: string; label: string; icon: React.ReactNode };

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) return null;

  const cartCount = items.reduce((s: number, i: any) => s + (i.quantity ?? 1), 0);

  const roleLinks: NavLink[] = (() => {
    if (!user) return [];
    if (user.role === "customer") {
      return [
        { href: "/restaurants", label: "Restaurants", icon: <Home className="w-4 h-4" /> },
        { href: "/orders", label: "My orders", icon: <ClipboardList className="w-4 h-4" /> },
      ];
    }
    if (user.role === "restaurant_owner") {
      return [
        { href: "/my-restaurants", label: "My restaurants", icon: <Store className="w-4 h-4" /> },
        { href: "/orders", label: "Orders", icon: <ClipboardList className="w-4 h-4" /> },
        { href: "/dashboard", label: "Dashboard", icon: <ChefHat className="w-4 h-4" /> },
      ];
    }
    if (user.role === "driver") {
      return [
        { href: "/deliveries", label: "Deliveries", icon: <Truck className="w-4 h-4" /> },
        { href: "/orders", label: "My orders", icon: <ClipboardList className="w-4 h-4" /> },
        { href: "/dashboard", label: "Dashboard", icon: <Truck className="w-4 h-4" /> },
      ];
    }
    return [];
  })();

  return (
    <nav className="bg-[#FAF5EC]/95 backdrop-blur-sm border-b border-[#2A1C14]/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#A5311F] rounded-lg flex items-center justify-center text-white group-hover:bg-[#8A2818] transition-colors">
              <span className="font-serif text-base leading-none">F</span>
            </div>
            <span className="font-serif text-lg text-[#2A1C14]">FoodDelivery</span>
          </Link>

          {/* Desktop nav links */}
          {user && (
            <div className="hidden sm:flex items-center gap-1">
              {roleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2A1C14]/60 hover:text-[#A5311F] rounded-lg transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Cart (customers only) */}
            {user?.role === "customer" && (
              <Link
                href="/restaurants"
                className="relative p-2.5 text-[#2A1C14]/60 hover:text-[#A5311F] rounded-lg transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-[#A5311F] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth area */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-[#2A1C14]/10">
                <div className="flex items-center gap-1.5 text-sm text-[#2A1C14]/60">
                  <User className="w-4 h-4" />
                  <span className="max-w-[140px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-[#2A1C14]/40 hover:text-[#A5311F] rounded-lg transition-colors"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#2A1C14]/70 hover:text-[#A5311F] transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-[#A5311F] text-white rounded-lg hover:bg-[#8A2818] transition-colors"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden p-2.5 text-[#2A1C14]/60 hover:text-[#A5311F] rounded-lg transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — the original had no way to reach these links on small screens */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#FAF5EC] border-t border-[#2A1C14]/10">
          <div className="px-4 py-3 space-y-1">
            {user && roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#2A1C14]/70 hover:text-[#A5311F] hover:bg-[#A5311F]/5 rounded-lg transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-2 text-sm text-[#2A1C14]/50 border-t border-[#2A1C14]/10 mt-2 pt-3">
                  <User className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#A5311F] hover:bg-[#A5311F]/5 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </>
            )}

            {!user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#2A1C14]/70 hover:bg-[#A5311F]/5 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" /> Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 bg-[#A5311F] text-white text-sm font-medium rounded-lg"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}