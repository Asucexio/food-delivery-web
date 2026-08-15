import { SearchX, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Foodie",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-6xl font-extrabold text-red-500 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}