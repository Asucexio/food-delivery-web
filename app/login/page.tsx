"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/src/lib/api";
import { useAuth } from "@/src/context/AuthContext";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { getRedirectPath } from "@/src/lib/utils";

// Matches the palette used across the site:
// ink #2A1C14, berbere #A5311F, turmeric #C68A2E, sage #4B6B4F, parchment #FAF5EC

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(email, password);
      const token = data.session?.access_token;
      if (!token) throw new Error("No token received");

      const payload = JSON.parse(atob(token.split(".")[1]));
      const user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      setAuth(token, user);

      // Role-based redirect
      const redirectTo = getRedirectPath(user.role);
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF5EC] px-4">
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
            <h1 className="font-serif text-3xl text-[#2A1C14]">Welcome back</h1>
            <p className="text-[#2A1C14]/50 mt-2 text-sm">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-[#A5311F]/8 border border-[#A5311F]/20 rounded-lg text-[#A5311F] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 text-[#2A1C14] placeholder:text-[#2A1C14]/30 border border-[#2A1C14]/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5311F]/30 focus:border-[#A5311F]/40 transition"
                  placeholder="••••••••"
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

            <div className="flex justify-end -mt-1">
              <Link href="/forgot-password" className="text-xs font-medium text-[#2A1C14]/50 hover:text-[#A5311F] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#A5311F] hover:bg-[#8A2818] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#2A1C14]/50">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#A5311F] hover:text-[#8A2818] font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}