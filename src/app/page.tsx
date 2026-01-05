import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl space-y-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/20">
          <Zap className="h-10 w-10 text-white" />
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white drop-shadow-sm">
          Scalable Task <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Dashboard</span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Experience a modern, secure, and scalable web application built with <span className="text-white font-semibold">Next.js 15</span>, <span className="text-white font-semibold">MongoDB</span>, and <span className="text-white font-semibold">Tailwind</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Create Account
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 pt-10 border-t border-white/5">
          <div className="glass-card p-6 rounded-2xl">
            <ShieldCheck className="h-10 w-10 text-emerald-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-white mb-2">Secure Auth</h3>
            <p className="text-sm text-slate-400">JWT-based authentication with NextAuth.js and bcrypt encryption.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <LayoutDashboard className="h-10 w-10 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-white mb-2">Interactive Dashboard</h3>
            <p className="text-sm text-slate-400">Real-time CRUD operations with simplified state management.</p>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <Zap className="h-10 w-10 text-amber-400 mb-4 mx-auto" />
            <h3 className="text-lg font-bold text-white mb-2">High Performance</h3>
            <p className="text-sm text-slate-400">Optimized with Next.js App Router and Server Actions.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
