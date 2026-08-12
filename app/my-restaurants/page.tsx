"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { getRestaurants, deleteRestaurant } from "@/src/lib/api";
import Link from "next/link";
import { Plus, Store, MapPin, Phone, Pencil, Trash2, Loader2 } from "lucide-react";

export default function MyRestaurantsPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "restaurant_owner") {
      router.push("/");
      return;
    }
    loadRestaurants();
  }, [user, router]);

  async function loadRestaurants() {
    try {
      const all = await getRestaurants();
      const mine = all.filter((r: any) => r.owner_id === user?.id);
      setRestaurants(mine);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token || !confirm("Are you sure you want to delete this restaurant?")) return;
    setDeletingId(id);
    try {
      await deleteRestaurant(id, token);
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (!user || user.role !== "restaurant_owner") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Restaurants</h1>
            <p className="text-gray-500 mt-1">Manage your restaurant listings</p>
          </div>
          <Link
            href="/my-restaurants/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition"
          >
            <Plus className="w-4 h-4" />
            Add Restaurant
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{r.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    {r.address && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {r.address}
                      </span>
                    )}
                    {r.phone_number && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {r.phone_number}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/my-restaurants/${r.id}/menu`}
                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                    title="Manage Menu"
                  >
                    <Store className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/my-restaurants/${r.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={deletingId === r.id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === r.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            {restaurants.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Store className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">No restaurants yet</p>
                <Link
                  href="/my-restaurants/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Restaurant
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}