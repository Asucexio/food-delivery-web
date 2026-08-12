"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRestaurantById, getMenuItemsByRestaurantId } from "@/src/lib/api";
import { useCart } from "@/src/context/CartContext";
import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";
import {
  ArrowLeft, Plus, Minus, ShoppingCart, MapPin, Phone, Mail, Clock, Star,
  ChefHat, Heart, Share2, Info, Loader2
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem, items, restaurantId, updateQuantity, total } = useCart();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [r, m] = await Promise.all([
          getRestaurantById(id as string),
          getMenuItemsByRestaurantId(id as string),
        ]);
        setRestaurant(r);
        setMenuItems(m || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, [id]);

  const adjustQty = (itemId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    addItem(
      { menuItemId: item.id, name: item.name, price: item.price, quantity: qty },
      id as string
    );
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  const cartItemFor = (menuItemId: string) => items.find((i) => i.menuItemId === menuItemId);

  const categories = ["all", "popular", "main", "sides", "drinks"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">Restaurant not found</p>
          <Link href="/restaurants" className="inline-block mt-4 text-orange-500 hover:underline">
            Browse other restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop`}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/restaurants" className="inline-flex items-center gap-1 text-white/80 text-sm hover:text-white mb-3 transition">
              <ArrowLeft className="w-4 h-4" /> Back to restaurants
            </Link>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.5 (200+ reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 30-45 min
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {restaurant.address || "Addis Ababa"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsLiked(!isLiked)} className={`p-3 rounded-full backdrop-blur-sm transition ${isLiked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                </button>
                <button className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center gap-6">
          {restaurant.phone_number && (
            <a href={`tel:${restaurant.phone_number}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
              <Phone className="w-4 h-4" /> {restaurant.phone_number}
            </a>
          )}
          {restaurant.email && (
            <a href={`mailto:${restaurant.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition">
              <Mail className="w-4 h-4" /> {restaurant.email}
            </a>
          )}
          <span className="flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Open Now
          </span>
          <span className="text-sm text-gray-400">Free Delivery</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-orange-500" /> Menu
        </h2>

        <div className="space-y-4">
          {menuItems.map((item) => {
            const cartItem = cartItemFor(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between gap-4 hover:shadow-md transition"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-orange-600 font-bold text-lg mt-2">${Number(item.price).toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {cartItem ? (
                    <div className="flex items-center gap-2 bg-orange-50 rounded-xl p-1.5">
                      <button onClick={() => updateQuantity(item.id, cartItem.quantity - 1)} className="p-2 hover:bg-orange-100 rounded-lg transition">
                        <Minus className="w-4 h-4 text-orange-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-orange-700">{cartItem.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, cartItem.quantity + 1)} className="p-2 hover:bg-orange-100 rounded-lg transition">
                        <Plus className="w-4 h-4 text-orange-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-gray-100 rounded-xl">
                        <button onClick={() => adjustQty(item.id, -1)} className="p-2.5 hover:bg-gray-200 rounded-l-xl transition">
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{quantities[item.id] || 1}</span>
                        <button onClick={() => adjustQty(item.id, 1)} className="p-2.5 hover:bg-gray-200 rounded-r-xl transition">
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition shadow-lg shadow-orange-500/20"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No menu items yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
          </div>
        )}
      </div>

      {items.length > 0 && restaurantId === id && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {items.reduce((s, i) => s + i.quantity, 0)} items in cart
                </p>
                <p className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</p>
              </div>
            </div>
            {user ? (
              <Link
                href="/checkout"
                className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                Checkout <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition flex items-center gap-2"
              >
                Login to Order <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}