"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/src/lib/api";
import { useAuth } from "@/src/context/AuthContext";
import { Loader2, Mail, Lock, User, Eye, EyeOff, ChefHat, Truck, UtensilsCrossed } from "lucide-react";
import { getRedirectPath } from "@/src/lib/utils";

// Matches the palette used across the site:
// ink #2A1C14, berbere #A5311F, turmeric #C68A2E, sage #4B6B4F, parchment #FAF5EC

type Role = "customer" | "restaurant_owner" | "driver";

export default function RegisterPage() {
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roles: { value: Role; label: string; icon: React.ReactNode }[] = [
    { value: "customer", label: "Customer", icon: <UtensilsCrossed className="w-5 h-5" /> },
    { value: "restaurant_owner", label: "Restaurant owner", icon: <ChefHat className="w-5 h-5" /> },
    { value: "driver", label: "Driver", icon: <Truck className="w-5 h-5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await register(email, password, name, role);

      // Case 1: Session returned immediately (email confirmation OFF)
      if (data.session?.access_token) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        };
        setAuth(data.session.access_token, user);

        // Role-based redirect
        const redirectTo = getRedirectPath(user.role);
        router.push(redirectTo);
        return;
      }

      // Case 2: No session — email confirmation required
      setSuccessMsg("Registration successful! Please check your email to confirm, then log in.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF5EC] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-[#A5311F] rounded-lg flex items-center justify-center text-white">
            <span className="font-serif text-base leading-none">F</span>
          </div>
          <span className="font-serif text-lg text-[#2A1C14]">FoodDelivery</span>
        </Link>

        <div className="bg-white rounded-2xl border border-[#2A1C14]/8 shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-[#2A1C14]">Create your account</h1>
            <p className="text-[#2A1C14]/50 mt-2 text-sm">
              Join thousands ordering from local restaurants
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-[#A5311F]/8 border border-[#A5311F]/20 rounded-lg text-[#A5311F] text-sm">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 bg-[#4B6B4F]/8 border border-[#4B6B4F]/20 rounded-lg text-[#4B6B4F] text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2A1C14]/70 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#2A1C14]/35" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-[#2A1C14] placeholder:text-[#2A1C14]/30 border border-[#2A1C14]/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5311F]/30 focus:border-[#A5311F]/40 transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2A1C14]/70 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#2A1C14]/35" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-[#2A1C14] placeholder:text-[#2A1C14]/30 border border-[#2A1C14]/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5311F]/30 focus:border-[#A5311F]/40 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2A1C14]/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#2A1C14]/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 text-[#2A1C14] placeholder:text-[#2A1C14]/30 border border-[#2A1C14]/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5311F]/30 focus:border-[#A5311F]/40 transition"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2A1C14]/35 hover:text-[#2A1C14]/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2A1C14]/70 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors ${
                      role === r.value
                        ? "border-[#A5311F] bg-[#A5311F]/8 text-[#A5311F]"
                        : "border-[#2A1C14]/12 hover:border-[#2A1C14]/25 text-[#2A1C14]/50"
                    }`}
                  >
                    {r.icon}
                    <span className="text-xs font-medium text-center leading-tight">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#A5311F] hover:bg-[#8A2818] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#2A1C14]/50">
          Already have an account?{" "}
          <Link href="/login" className="text-[#A5311F] hover:text-[#8A2818] font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}