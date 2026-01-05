"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function ProfileForm({ user }: { user: any }) {
    const { update } = useSession();
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [age, setAge] = useState(user.age || "");
    const [phone, setPhone] = useState(user.phone || "");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, age, phone }), // Email is usually immutable or requires separate verification
            });

            if (res.ok) {
                setMessage("Profile updated successfully!");
                await update({ name, age, phone });
            } else {
                setMessage("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="profile-name" className="text-slate-300">Full Name</Label>
                    <Input
                        id="profile-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="glass-input text-white placeholder:text-slate-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profile-email" className="text-slate-300">Email Address</Label>
                    <Input
                        id="profile-email"
                        value={email}
                        disabled
                        className="glass-input text-slate-400 bg-black/40 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500">Email cannot be changed.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="profile-age" className="text-slate-300">Age</Label>
                        <Input
                            id="profile-age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="glass-input text-white placeholder:text-slate-500"
                            placeholder="e.g. 25"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="profile-phone" className="text-slate-300">Phone Number</Label>
                        <Input
                            id="profile-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="glass-input text-white placeholder:text-slate-500"
                            placeholder="+91"
                        />
                    </div>
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-lg text-sm border ${message.includes("success") ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                    {message}
                </div>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
            </Button>
        </form>
    );
}
