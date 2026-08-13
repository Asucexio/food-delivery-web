"use client";

import { Search, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/restaurants?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-orange-500 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Delivering to New York, NY
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Hungry? We&apos;ve got you{" "}
            <span className="text-yellow-300">covered.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            Order from the best local restaurants. Fresh food, fast delivery, right to your door.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food, restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white shadow-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
