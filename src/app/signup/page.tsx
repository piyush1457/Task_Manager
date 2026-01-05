"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, SignupInput } from "@/lib/schemas";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupInput) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error || "Something went wrong");
                return;
            }

            router.push("/login?signup=success");
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md space-y-8 rounded-2xl glass-card p-8 shadow-2xl relative z-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                    <p className="mt-2 text-slate-400">Start your journey today</p>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-200">Name</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            className="glass-input placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-400">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="glass-input placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-200">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className="glass-input placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-400">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold h-12 shadow-lg shadow-indigo-500/20 border-0" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                    </Button>

                    <p className="text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
