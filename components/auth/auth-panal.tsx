"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, HeartHandshake, Loader2, ShieldCheck, UserRound } from "lucide-react";
import OrbBackground from "@/components/orb-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, Role, tokenStorage } from "@/lib/api";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";

type AuthPanelProps = {
  mode: AuthMode;
};

const roles: Array<{ value: Role; title: string; description: string; icon: typeof Building2 }> = [
  {
    value: "donor",
    title: "Donor",
    description: "Restaurants, grocers, farms, and kitchens sharing surplus food.",
    icon: Building2,
  },
  {
    value: "recipient",
    title: "Recipient",
    description: "Shelters, pantries, and community groups coordinating pickups.",
    icon: UserRound,
  },
];

export default function AuthPanel({ mode }: AuthPanelProps) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [role, setRole] = useState<Role>("donor");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinationForRole = (selectedRole: Role) => (selectedRole === "donor" ? "/donor-dashboard" : "/donations/browse");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      if (isRegister) {
        const data = await api.register({
          name: String(form.get("name") || "").trim(),
          email,
          password,
          role,
        });

        if (data.session?.access_token) {
          tokenStorage.set(data.session.access_token);
          router.push(destinationForRole(role));
          return;
        }

        setMessage("Account created. Please check your email to confirm your account before signing in.");
        return;
      }

      const data = await api.login({ email, password });
      tokenStorage.set(data.session.access_token);
      const { profile } = await api.me();
      router.push(destinationForRole(profile.role));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#dcfce7,_transparent_34%),linear-gradient(135deg,_#f7fee7_0%,_#ecfdf5_52%,_#fff7ed_100%)] px-4 py-10 text-slate-950 dark:bg-[linear-gradient(135deg,_#052e16_0%,_#064e3b_55%,_#431407_100%)] dark:text-white sm:px-6 lg:px-8">
      <OrbBackground />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          <section className="hidden rounded-[2rem] border border-white/70 bg-white/60 p-10 shadow-2xl shadow-emerald-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/40 lg:block">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <span className="font-aleo text-2xl font-bold tracking-tight">FoodBridge</span>
            </Link>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-200">Secure community access</p>
            <h1 className="mt-4 font-aleo text-5xl font-semibold leading-tight tracking-tight text-emerald-950 dark:text-white">
              Connect surplus food with people who can use it today.
            </h1>
            <div className="mt-8 grid gap-4">
              {["Verified profiles for donors and recipient teams", "Role-based journeys after sign in", "Recipient approval messaging built into onboarding"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm font-semibold text-slate-700 shadow-sm dark:bg-white/10 dark:text-emerald-50">
                  <ShieldCheck className="h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <Card className="border-white/70 bg-white/85 shadow-2xl shadow-emerald-950/10 backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-4">
                <Link href="/" className="inline-flex items-center gap-2 lg:hidden">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white">
                    <HeartHandshake className="h-5 w-5" />
                  </span>
                  <span className="font-aleo text-xl font-bold">FoodBridge</span>
                </Link>
                <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-100">
                  {isRegister ? "Join FoodBridge" : "Welcome back"}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-aleo text-3xl font-semibold tracking-tight sm:text-4xl">
                  {isRegister ? "Create your food rescue account" : "Sign in to FoodBridge"}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {isRegister
                    ? "Choose how you participate, then start moving surplus meals to nearby organizations."
                    : "Access your dashboard, manage donations, and coordinate timely pickups."}
                </p>
              </div>

              {message && (
                <div className={cn("mt-6 rounded-2xl border px-4 py-3 text-sm", message.includes("created") ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700")} role="alert">
                  {message}
                </div>
              )}

              <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
                {isRegister && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name or organization</Label>
                    <Input id="name" name="name" autoComplete="name" placeholder="FoodBridge Kitchen" required />
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={6} placeholder="••••••••" required />
                </div>

                {isRegister && (
                  <fieldset className="grid gap-3">
                    <legend className="text-sm font-medium">I am joining as a</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {roles.map((option) => {
                        const Icon = option.icon;
                        const selected = role === option.value;
                        return (
                          <button key={option.value} type="button" onClick={() => setRole(option.value)} className={cn("rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg", selected ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 dark:bg-emerald-400/15 dark:text-white" : "border-border bg-background/70 text-muted-foreground")} aria-pressed={selected}>
                            <Icon className="mb-3 h-5 w-5 text-emerald-700 dark:text-emerald-200" />
                            <strong className="block text-sm text-foreground">{option.title}</strong>
                            <span className="mt-1 block text-xs leading-5">{option.description}</span>
                          </button>
                        );
                      })}
                    </div>
                    {role === "recipient" && <p className="text-xs leading-5 text-amber-700 dark:text-amber-200">Recipient accounts may need admin approval before browsing or claiming donations.</p>}
                  </fieldset>
                )}

                <Button className="h-12 w-full rounded-full bg-emerald-700 text-white hover:bg-emerald-800" disabled={isSubmitting} type="submit">
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                  {isSubmitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isRegister ? "Already have an account?" : "New to FoodBridge?"}{" "}
                <Link href={isRegister ? "/auth/login" : "/auth/register"} className="font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-200">
                  {isRegister ? "Sign in" : "Create an account"}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}