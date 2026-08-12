"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getRestaurants } from "@/src/lib/api";
import {
  ArrowRight, Star, Clock, MapPin, UtensilsCrossed, Truck,
  ShieldCheck, Zap, Heart, ChevronRight, Users, Award,
  Smartphone, ChefHat, Package, Quote
} from "lucide-react";

/**
 * DESIGN NOTES
 * ------------
 * Palette (warm, food/coffee-culture inspired instead of a generic orange gradient):
 *   ink        #2A1C14   deep coffee brown — primary text, dark sections
 *   parchment  #FAF5EC   warm ivory — page background
 *   berbere    #A5311F   brick red — primary CTA / accent
 *   turmeric   #C68A2E   mustard gold — secondary accent, highlights
 *   sage       #4B6B4F   muted olive green — "open" / success signals
 *
 * Type: a serif display face for headlines (character, not a neutral grotesk)
 * paired with a plain sans for body copy. If you have next/font available,
 * swap the `font-serif-display` / `font-sans-body` classes below for real
 * imports, e.g.:
 *
 *   import { Fraunces, Inter } from "next/font/google";
 *   const display = Fraunces({ subsets: ["latin"], weight: ["500","600"], variable: "--font-display" });
 *   const body = Inter({ subsets: ["latin"], variable: "--font-body" });
 *
 * and apply `${display.variable} ${body.variable}` on the root wrapper.
 * Until then this falls back to Tailwind's built-in serif/sans stacks, which
 * already reads far less templated than a single sans-serif everywhere.
 */

function useCountUp(end: number, duration: number = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
}

function StatItem({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="text-center border-l border-white/10 first:border-l-0 px-4">
      <p className="text-3xl md:text-4xl font-serif font-semibold text-white tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-white/50 text-xs tracking-wide uppercase mt-2">{label}</p>
    </div>
  );
}

// Deterministic "rating" fallback so the server and client render the same
// markup (Math.random() during render causes hydration mismatches in Next.js).
function displayRating(restaurant: any, index: number) {
  if (typeof restaurant?.rating === "number") return restaurant.rating.toFixed(1);
  const seeded = [4.9, 4.6, 4.8, 4.5, 4.7, 4.9];
  return seeded[index % seeded.length].toFixed(1);
}

const RESTAURANT_IMAGES = [
  "1517248135467-4c7edcad34c4",
  "1552566626-52f8b828add9",
  "1559339352-11d035aa65de",
  "1414235077428-338989a2e8c0",
  "1555396273-367ea4eb4db5",
  "1514933651103-005eec06c04b",
];

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data.slice(0, 6)))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: "Fast, reliable delivery", desc: "Most orders arrive in under 30 minutes, tracked door to door." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure checkout", desc: "Card and mobile-money payments, encrypted end to end." },
    { icon: <Heart className="w-5 h-5" />, title: "Vetted restaurants", desc: "Every partner is reviewed and rated by real customers." },
    { icon: <Smartphone className="w-5 h-5" />, title: "Live order tracking", desc: "Watch your order move from kitchen to doorstep in real time." },
  ];

  const steps = [
    { icon: <UtensilsCrossed className="w-6 h-6" />, title: "Browse", desc: "Search hundreds of local restaurants and cuisines near you." },
    { icon: <Package className="w-6 h-6" />, title: "Order", desc: "Add dishes to your cart and check out in a few taps." },
    { icon: <ChefHat className="w-6 h-6" />, title: "Prepare", desc: "The restaurant confirms and prepares your meal fresh." },
    { icon: <Truck className="w-6 h-6" />, title: "Deliver", desc: "A rider brings it straight to your door, still hot." },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EC] font-sans text-[#2A1C14]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#2A1C14]">
        {/* quiet texture instead of glowing blur orbs */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-20">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-white/70 text-xs tracking-wide uppercase mb-8">
                <MapPin className="w-3.5 h-3.5" />
                Serving Addis Ababa
              </div>
              <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-white">
                Good food,
                <br />
                <span className="text-[#C68A2E]">delivered properly.</span>
              </h1>
              <p className="mt-6 text-lg text-white/60 max-w-md leading-relaxed">
                Order from restaurants across the city — from traditional
                Ethiopian kitchens to your favorite international spots —
                and track it all the way to your door.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/restaurants"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#A5311F] text-white font-medium rounded-lg hover:bg-[#8A2818] transition-colors"
                >
                  Browse restaurants
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                >
                  Create an account
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#C68A2E]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/50">
                  4.8 average rating from 10,000+ customers
                </p>
              </div>
            </div>

            {/* Signature element: a single framed "order ticket" panel,
                instead of a scattered floating-photo collage */}
            <div className="relative hidden lg:block">
              <div className="bg-[#FAF5EC] rounded-2xl p-6 shadow-2xl shadow-black/40 rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=420&fit=crop"
                  alt="A fresh, plated meal ready for delivery"
                  className="w-full h-56 object-cover rounded-lg"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-lg">Doro Wat &amp; Injera</p>
                    <p className="text-sm text-[#2A1C14]/50">Habesha Kitchen · Bole</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#4B6B4F]/10 text-[#4B6B4F]">
                    On the way
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed border-[#2A1C14]/15 flex items-center justify-between text-sm text-[#2A1C14]/50">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> 24 min away
                  </span>
                  <span>Order #4821</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C68A2E] text-[#2A1C14] rounded-xl px-5 py-3 shadow-xl -rotate-3">
                <p className="text-2xl font-serif font-semibold leading-none">30 min</p>
                <p className="text-xs mt-1 font-medium">avg. delivery time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#3A2A1E] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem end={500} suffix="+" label="Restaurants" />
            <StatItem end={50} suffix="K+" label="Customers" />
            <StatItem end={30} suffix=" min" label="Avg. delivery" />
            <StatItem end={99} suffix="%" label="Satisfaction" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A5311F]">
              Why customers choose us
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Delivery that just works
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A1C14]/10 rounded-xl overflow-hidden">
            {features.map((f, i) => (
              <div key={i} className="bg-[#FAF5EC] p-7">
                <div className="w-10 h-10 rounded-lg bg-[#A5311F]/10 text-[#A5311F] flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#2A1C14]/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED RESTAURANTS */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#A5311F]">
                Popular near you
              </span>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                Featured restaurants
              </h2>
            </div>
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2A1C14] hover:text-[#A5311F] transition-colors"
            >
              View all restaurants
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#FAF5EC] rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-16 text-[#2A1C14]/50 border border-dashed border-[#2A1C14]/15 rounded-xl">
              No restaurants to show right now — check back shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant, i) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurants/${restaurant.id}`}
                  className="group bg-white rounded-xl border border-[#2A1C14]/10 overflow-hidden hover:shadow-lg hover:border-[#2A1C14]/20 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${RESTAURANT_IMAGES[i % RESTAURANT_IMAGES.length]}?w=600&h=400&fit=crop`}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full text-xs font-semibold text-[#2A1C14] flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#C68A2E] text-[#C68A2E]" />
                      {displayRating(restaurant, i)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg group-hover:text-[#A5311F] transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#2A1C14]/50 text-sm mt-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{restaurant.address || "Addis Ababa, Ethiopia"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs">
                      <span className="px-2.5 py-1 bg-[#4B6B4F]/10 text-[#4B6B4F] font-medium rounded-full">
                        Open now
                      </span>
                      <span className="px-2.5 py-1 bg-[#2A1C14]/5 text-[#2A1C14]/60 font-medium rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {20 + i * 5}–{35 + i * 5} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#2A1C14] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C68A2E]">
              How it works
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              From craving to doorstep, in four steps
            </h2>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-white/10" />
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="w-12 h-12 rounded-full bg-[#3A2A1E] border border-white/10 flex items-center justify-center text-[#C68A2E] mb-5 relative z-10">
                  {s.icon}
                </div>
                <h3 className="font-serif text-lg mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Quote className="w-8 h-8 text-[#C68A2E] mx-auto mb-6" />
          <p className="font-serif text-2xl md:text-3xl leading-snug text-[#2A1C14]">
            "Everything arrives on time, still warm, and the tracking
            actually tells me something useful — not just a spinning icon."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#A5311F]/10 flex items-center justify-center text-sm font-semibold text-[#A5311F]">
              M
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Meron T.</p>
              <p className="text-xs text-[#2A1C14]/50">Bole, Addis Ababa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#A5311F] rounded-2xl p-12 md:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Hungry? Let's fix that.
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Join thousands of customers ordering from local restaurants
              every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#A5311F] font-medium rounded-lg hover:bg-[#FAF5EC] transition-colors"
              >
                Browse restaurants
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2A1C14] text-white/50 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="font-serif text-xl text-white mb-4">FoodDelivery</div>
              <p className="text-sm leading-relaxed">
                Connecting you with the best restaurants in Addis Ababa —
                ordered in minutes, delivered fresh.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">For customers</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/restaurants" className="hover:text-white transition-colors">Browse restaurants</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log in</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">For partners</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/register" className="hover:text-white transition-colors">List your restaurant</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Become a rider</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li>support@fooddelivery.et</li>
                <li>+251 911 234 567</li>
                <li>Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2026 FoodDelivery. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#A5311F] fill-[#A5311F]" />
              <span>in Ethiopia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}