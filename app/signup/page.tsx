"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uname,
                    email,
                    password,
                    phone,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            // Redirect to login after successful registration
            router.push("/login?registered=true");
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
                            Join the Community
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Create an account to access premium features and start your journey with Kodflix.
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
                                    No credit card required
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Register Form */}
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
                                Create an account
                            </h2>
                            <p className="text-zinc-500 mt-1.5 text-sm">
                                Fill in your details to get started
                            </p>
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
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={uname}
                                    onChange={(e) => setUname(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center mt-6 text-zinc-500 text-sm animate-form-in-delay-2">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/login");
                                }}
                            >
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
