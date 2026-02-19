"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"email" | "mobile">("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: activeTab === "email" ? email : mobile, // Using mobile as email field for now if needed, or handle separately
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Redirect
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-950">
      {/* Left Section - Glassmorphism */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden animate-form-in">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/90 via-indigo-600/90 to-violet-700/90" />
        {/* Mesh gradient + orbs for depth behind glass */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_80%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-sky-300/20 blur-3xl" />

        {/* Full-height glass layer */}
        <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl border-r border-white/10" />

        {/* Content container */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">
          {/* Logo - glass pill */}
          <div>
            <div className="flex items-center gap-2 mb-16">
              <div className="flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-inner">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="text-base font-semibold text-white/95 tracking-tight">
                  Kodflix
                </span>
              </div>
            </div>
          </div>

          {/* Glass card for main content */}
          <div className="max-w-md rounded-2xl bg-white/[0.07] backdrop-blur-2xl border border-white/20 p-8 xl:p-10 shadow-xl shadow-black/10">
            <h1 className="text-4xl xl:text-5xl font-semibold text-white tracking-tight leading-[1.15] mb-6">
              Simple Web Login & Sign Up Page
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Secure, modern authentication. Sign in or create an account to get
              started with your journey.
            </p>

            {/* Trust line */}
            <div className="mt-10 pt-6 border-t border-white/15">
              <div className="flex items-center gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </span>
                  Enterprise-grade security
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  Lightning fast
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="relative flex-1 lg:w-[48%] flex items-center justify-center min-h-screen lg:min-h-0 p-6 sm:p-8 md:p-12">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-zinc-50 -z-10" />
        <div
          className="absolute inset-0 opacity-50 -z-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.035) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10 animate-form-in-delay-1">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-semibold text-zinc-900">Kodflix</span>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-soft-lg border border-zinc-100 p-8 sm:p-10 animate-form-in">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-zinc-500 mt-1.5 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email / Mobile Tabs */}
            <div className="flex p-1 mb-6 bg-zinc-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("email")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "email"
                  ? "bg-white text-zinc-900 shadow-card"
                  : "text-zinc-500 hover:text-zinc-700"
                  }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "mobile"
                  ? "bg-white text-zinc-900 shadow-card"
                  : "text-zinc-500 hover:text-zinc-700"
                  }`}
              >
                Mobile
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Input Fields Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="input"
                  className="block text-sm font-medium text-zinc-700 mb-1.5"
                >
                  {activeTab === "email" ? "Email address" : "Mobile number"}
                </label>
                <input
                  id="input"
                  type={activeTab === "email" ? "email" : "tel"}
                  value={activeTab === "email" ? email : mobile}
                  onChange={(e) =>
                    activeTab === "email"
                      ? setEmail(e.target.value)
                      : setMobile(e.target.value)
                  }
                  placeholder={
                    activeTab === "email"
                      ? "name@company.com"
                      : "+1 (555) 000-0000"
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-700 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                />
              </div>

              <div className="flex justify-end mt-3">
                <a
                  href="#"
                  className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Continue"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-zinc-400 text-sm">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 h-11 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                aria-label="Sign in with Google"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex-1 h-11 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                aria-label="Sign in with GitHub"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button
                type="button"
                className="flex-1 h-11 rounded-xl border border-zinc-200 flex items-center justify-center gap-2 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
                aria-label="Sign in with Apple"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center mt-6 text-zinc-500 text-sm animate-form-in-delay-2">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/signup");
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
