export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <section className="bg-red-500 py-16">
        <div className="container mx-auto px-4">
          <div className="h-10 w-3/4 max-w-md bg-red-400/40 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-1/2 max-w-sm bg-red-400/30 rounded-lg animate-pulse" />
        </div>
      </section>

      {/* Categories skeleton */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded-full animate-pulse shrink-0"
            />
          ))}
        </div>
      </section>

      {/* Restaurants grid skeleton */}
      <section className="py-8 container mx-auto px-4">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}