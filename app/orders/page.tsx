"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { getMyOrders } from "@/src/lib/api";
import Link from "next/link";
import { Loader2, Package, Clock, CheckCircle, XCircle, ChefHat, Truck } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4" /> },
  preparing: { label: "Preparing", color: "bg-blue-100 text-blue-700", icon: <ChefHat className="w-4 h-4" /> },
  ready: { label: "Ready for Pickup", color: "bg-purple-100 text-purple-700", icon: <Package className="w-4 h-4" /> },
  picked_up: { label: "On the Way", color: "bg-indigo-100 text-indigo-700", icon: <Truck className="w-4 h-4" /> },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4" /> },
};

export default function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getMyOrders(token)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please log in to view your orders</p>
          <Link href="/login" className="text-orange-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-500 mb-8">
          {user.role === "customer" && "Track your food orders"}
          {user.role === "restaurant_owner" && "Manage orders for your restaurants"}
          {user.role === "driver" && "Your assigned deliveries"}
        </p>

        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.delivery_address || "No delivery address"}
                    </p>
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm text-orange-500 hover:text-orange-600 font-medium whitespace-nowrap"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No orders yet</p>
            {user.role === "customer" && (
              <Link
                href="/restaurants"
                className="inline-block mt-4 text-orange-500 hover:underline"
              >
                Browse Restaurants
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}