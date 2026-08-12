"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRestaurants } from "@/src/lib/api";
import { MapPin, Star, Clock, Search, ArrowRight, UtensilsCrossed } from "lucide-react";

// Matches the palette used across the homepage / navbar:
// ink #2A1C14, berbere #A5311F, turmeric #C68A2E, sage #4B6B4F, parchment #FAF5EC

const RESTAURANT_IMAGES = [
  "1517248135467-4c7edcad34c4",
  "1552566626-52f8b828add9",
  "1559339352-11d035aa65de",
  "1414235077428-338989a2e8c0",
  "1555396273-367ea4eb4db5",
  "1514933651103-005eec06c04b",
];

function displayRating(restaurant: any, index: number) {
  if (typeof restaurant?.rating === "number") return restaurant.rating.toFixed(1);
  const seeded = [4.9, 4.6, 4.8, 4.5, 4.7, 4.9];
  return seeded[index % seeded.length].toFixed(1);
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
        setFiltered(data);
      })
      .catch(() => {
        setRestaurants([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = restaurants;

    if (category !== "all") {
      result = result.filter((r) => {
        const tag = (r.category || r.cuisine || "").toLowerCase();
        return tag.includes(category);
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.address && r.address.toLowerCase().includes(q))
      );
    }

    setFiltered(result);
  }, [search, category, restaurants]);

  const categories = [
    { key: "all", label: "All" },
    { key: "ethiopian", label: "Ethiopian" },
    { key: "fastfood", label: "Fast food" },
    { key: "pizza", label: "Pizza" },
    { key: "coffee", label: "Coffee" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EC]">
      {/* HEADER */}
      <div className="bg-[#2A1C14] pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C68A2E]">
            Addis Ababa
          </span>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl text-white">
            Discover restaurants
          </h1>
          <p className="mt-3 text-white/60 text-lg max-w-xl">
            Search over 500 restaurants across the city, from traditional
            kitchens to your usual favorites.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10">
        {/* SEARCH */}
        <div className="bg-white rounded-xl shadow-sm border border-[#2A1C14]/5 p-3 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2A1C14]/35" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or cuisines"
              className="w-full pl-12 pr-4 py-3.5 text-[#2A1C14] placeholder:text-[#2A1C14]/35 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5311F]/30 transition-shadow"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                category === cat.key
                  ? "bg-[#A5311F] text-white border-[#A5311F]"
                  : "bg-white text-[#2A1C14]/60 border-[#2A1C14]/10 hover:border-[#A5311F]/40 hover:text-[#A5311F]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-[#2A1C14]/50 mb-5">
          {loading
            ? "Loading restaurants…"
            : `${filtered.length} restaurant${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-[#2A1C14]/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filtered.map((restaurant, i) => (
              <Link
                key={restaurant.id}
                href={`/restaurants/${restaurant.id}`}
                className="group bg-white rounded-xl border border-[#2A1C14]/10 overflow-hidden hover:shadow-lg hover:border-[#2A1C14]/20 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${RESTAURANT_IMAGES[i % RESTAURANT_IMAGES.length]}?w=600&h=400&fit=crop`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-semibold text-[#2A1C14] flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#C68A2E] text-[#C68A2E]" />
                    {displayRating(restaurant, i)}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#4B6B4F] text-white text-xs font-medium rounded-full">
                      Open
                    </span>
                    <span className="px-2.5 py-1 bg-white/95 text-[#2A1C14]/70 text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {20 + (i % 4) * 5}–{30 + (i % 4) * 5} min
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#2A1C14] group-hover:text-[#A5311F] transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#2A1C14]/50 text-sm mt-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{restaurant.address || "Addis Ababa, Ethiopia"}</span>
                  </div>
                  {restaurant.phone_number && (
                    <p className="text-xs text-[#2A1C14]/35 mt-1">{restaurant.phone_number}</p>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A1C14]/8">
                    <span className="text-xs text-[#2A1C14]/40">Free delivery</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[#A5311F]">
                      View menu <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white border border-[#2A1C14]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <UtensilsCrossed className="w-6 h-6 text-[#2A1C14]/30" />
            </div>
            <h3 className="font-serif text-xl text-[#2A1C14] mb-2">No restaurants found</h3>
            <p className="text-[#2A1C14]/50 text-sm">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}