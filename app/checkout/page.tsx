"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { createOrder } from "@/src/lib/api";
import { ArrowLeft, MapPin, Loader2, CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const { items, restaurantId, total, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please log in to place an order</p>
          <Link href="/login" className="text-orange-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/restaurants" className="text-orange-500 hover:underline">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim() || !token || !restaurantId) return;
    setIsSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
      }));

      await createOrder(token, restaurantId, orderItems, address);
      setPlaced(true);
      clearCart();
    } catch (err: any) {
      alert(err.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-10 max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-6">
            Your order has been received. You can track it in your orders page.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/orders"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition"
            >
              View My Orders
            </Link>
            <Link
              href="/restaurants"
              className="px-6 py-3 text-gray-600 hover:text-gray-900 transition"
            >
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href={`/restaurants/${restaurantId}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to menu
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.menuItemId} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-orange-600 text-lg">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Delivery Address
          </h2>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full delivery address..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!address.trim() || isSubmitting}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Placing Order...
            </>
          ) : (
            `Place Order — $${total.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}