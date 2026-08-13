"use client";

import { useState, useMemo } from "react";
import { restaurants, categories } from "@/lib/data";
import RestaurantCard from "@/components/RestaurantCard";
import { Search, SlidersHorizontal, X, Star, Clock, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

type SortOption = "rating" | "delivery" | "price";

export default function RestaurantsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let result = [...restaurants];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (activeCategory !== "all") {
      result = result.filter((r) =>
        r.tags.some((t) => t.toLowerCase() === activeCategory)
      );
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((r) => r.rating >= minRating);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "delivery") {
        const aTime = parseInt(a.deliveryTime);
        const bTime = parseInt(b.deliveryTime);
        return aTime - bTime;
      }
      if (sortBy === "price") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

    return result;
  }, [searchQuery, activeCategory, sortBy, minRating]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurants</h1>
          <p className="text-gray-500">Discover the best food near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors ${
              showFilters
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Sort By</label>
                <div className="flex gap-2">
                  {[
                    { value: "rating" as SortOption, label: "Top Rated", icon: Star },
                    { value: "delivery" as SortOption, label: "Fastest", icon: Clock },
                    { value: "price" as SortOption, label: "Lowest Fee", icon: ArrowUpDown },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === opt.value
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <opt.icon className="w-3.5 h-3.5" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 4.0, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        minRating === rating
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {rating === 0 ? "Any" : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Restaurant Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
