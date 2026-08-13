"use client";

import { useParams } from "next/navigation";
import { getRestaurantById } from "@/lib/data";
import { useCart } from "@/lib/store";
import { Star, Clock, Truck, MapPin, Flame, Leaf, Pepper, ChevronLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurant = getRestaurantById(params.id as string);
  const { addItem, items, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h1>
          <Link href="/restaurants" className="text-red-500 hover:underline">Back to restaurants</Link>
        </div>
      </div>
    );
  }

  const categories = ["All", ...Array.from(new Set(restaurant.menu.map((m) => m.category)))];
  const filteredMenu = activeCategory === "All" ? restaurant.menu : restaurant.menu.filter((m) => m.category === activeCategory);

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((i) => i.id === itemId);
    return cartItem?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-80">
        <img src={restaurant.banner} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Link href="/restaurants" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3">
              <ChevronLeft className="w-4 h-4" /> Back to restaurants
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{restaurant.name}</h1>
            <p className="text-white/80 mt-1">{restaurant.cuisine}</p>
            <div className="flex items-center gap-4 mt-3 text-white/90 text-sm flex-wrap">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {restaurant.rating} ({restaurant.reviewCount})</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {restaurant.deliveryTime}</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> ${restaurant.deliveryFee.toFixed(2)} delivery</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {restaurant.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat ? "bg-red-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map((item) => {
            const qty = getItemQuantity(item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {item.popular && <Flame className="w-4 h-4 text-orange-500" />}
                      {item.vegetarian && <Leaf className="w-4 h-4 text-green-500" />}
                      {item.spicy && <Pepper className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-lg text-gray-900">${item.price.toFixed(2)}</span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, qty - 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                        <button onClick={() => updateQuantity(item.id, qty + 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          restaurantId: restaurant.id,
                          restaurantName: restaurant.name,
                        })}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
