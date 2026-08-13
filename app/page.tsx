"use client";

import Hero from "@/components/Hero";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, categories, getFeaturedRestaurants } from "@/lib/data";
import { useState } from "react";
import { ArrowRight, Flame, Clock, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const featured = getFeaturedRestaurants();

  const filteredRestaurants =
    activeCategory === "all"
      ? restaurants
      : restaurants.filter((r) =>
          r.tags.some((t) => t.toLowerCase() === activeCategory)
        );

  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-500"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <p className="text-gray-500 mt-1">Hand-picked favorites from our community</p>
          </div>
          <Link
            href="/restaurants"
            className="hidden sm:flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Foodie?</h2>
            <p className="text-gray-500 mt-2">The best food delivery experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Clock className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-500">Average delivery time under 30 minutes. Hot food, delivered fast.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Star className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Top Rated</h3>
              <p className="text-sm text-gray-500">Only the highest-rated local restaurants. Quality you can taste.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors group">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <TrendingUp className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-sm text-gray-500">Exclusive deals and low delivery fees. Great food, great value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activeCategory === "all" ? "All Restaurants" : `${categories.find(c => c.id === activeCategory)?.name} Restaurants`}
            </h2>
            <p className="text-gray-500 mt-1">{filteredRestaurants.length} restaurants available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flame className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to order?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Join thousands of happy customers. Your next favorite meal is just a few clicks away.
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-500 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-xl"
          >
            Browse Restaurants
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
