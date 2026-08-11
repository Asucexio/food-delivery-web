"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { LogOut, User, ShoppingBag, ChefHat, Truck } from "lucide-react";

export default function HomePage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            🍕 FoodDelivery
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Delicious food, <span className="text-orange-500">delivered fast</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Order from the best local restaurants and track your delivery in real-time.
          </p>
        </div>

        {/* Role-based quick actions */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <QuickActionCard
              icon={<ShoppingBag className="w-8 h-8 text-orange-500" />}
              title="Browse Restaurants"
              description="Explore menus and place your order"
              href="#"
            />
            <QuickActionCard
              icon={<ChefHat className="w-8 h-8 text-orange-500" />}
              title="My Restaurant"
              description="Manage your restaurant and menu"
              href="#"
            />
            <QuickActionCard
              icon={<Truck className="w-8 h-8 text-orange-500" />}
              title="Deliveries"
              description="View and manage your deliveries"
              href="#"
            />
          </div>
        )}

        {/* Guest CTA */}
        {!user && (
          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/25"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Ordering
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition group"
    >
      <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}