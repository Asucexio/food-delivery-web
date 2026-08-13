"use client";

import Link from "next/link";
import { Restaurant } from "@/lib/data";
import { Star, Clock, Truck } from "lucide-react";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-2">
            {restaurant.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-900">{restaurant.rating}</span>
            <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{restaurant.cuisine}</p>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gray-400" />
              <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
