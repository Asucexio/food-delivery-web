"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { getOrderById } from "@/src/lib/api";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getOrderById(id as string, token)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h1>
          <p className="text-sm text-gray-400 mb-6">Order #{order.id.slice(0, 8)}</p>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-50">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-gray-900 capitalize">
                {order.status.replace("_", " ")}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-50">
              <span className="text-gray-500">Delivery Address</span>
              <span className="font-medium text-gray-900 text-right max-w-xs">
                {order.delivery_address || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-50">
              <span className="text-gray-500">Ordered On</span>
              <span className="font-medium text-gray-900">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}