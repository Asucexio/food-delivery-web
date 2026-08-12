"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { useState } from "react";
import {
  LogOut, User, ShoppingCart, Home, ClipboardList, LayoutDashboard, Menu, X, MapPin
} from "lucide-react";

// Matches the palette used on the redesigned homepage:
// ink #2A1C14, berbere #A5311F, turmeric #C68A2E, parchment #FAF5EC

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) return null;

  const navLinks = [
    { href: "/restaurants", label: "Restaurants", icon: <Home className="w-4 h-4" />, show: true },
    { href: "/orders", label: "My Orders", icon: <ClipboardList className="w-4 h-4" />, show: !!user && user.role === "customer" },
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, show: !!user && (user.role === "restaurant_owner" || user.role === "driver") },
  ];

  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="bg-[#FAF5EC]/95 backdrop-blur-sm border-b border-[#2A1C14]/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#A5311F] rounded-lg flex items-center justify-center text-white group-hover:bg-[#8A2818] transition-colors">
              <span className="font-serif text-base leading-none">F</span>
            </div>
            <span className="font-serif text-lg text-[#2A1C14]">
              FoodDelivery
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.show).map((link) => (
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

          <div className="flex items-center gap-1">
            {/* Cart */}
            {(!user || user.role === "customer") && (
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
              <div className="hidden md:flex items-center gap-3 ml-2 pl-3 border-l border-[#2A1C14]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#A5311F]/10 flex items-center justify-center text-[#A5311F] text-xs font-semibold">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-[#2A1C14] max-w-[110px] truncate">
                    {user.name || user.email}
                  </span>
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
              <div className="hidden md:flex items-center gap-2 ml-2">
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
              className="md:hidden p-2.5 text-[#2A1C14]/60 hover:text-[#A5311F] rounded-lg transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FAF5EC] border-t border-[#2A1C14]/10">
          <div className="px-4 py-3 space-y-1">
            {navLinks.filter(l => l.show).map((link) => (
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
                  <MapPin className="w-4 h-4" /> Get started
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-[#A5311F] hover:bg-[#A5311F]/5 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}