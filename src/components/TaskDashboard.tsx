"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Trash2, CheckCircle, Circle, User as UserIcon, LayoutGrid } from "lucide-react";
import { ProfileForm } from "./ProfileForm";
import { cn } from "@/lib/utils";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
}

export default function TaskDashboard({ user }: { user: any }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/tasks");
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTaskTitle }),
            });

            if (res.ok) {
                const task = await res.json();
                setTasks([task, ...tasks]);
                setNewTaskTitle("");
            }
        } catch (error) {
            console.error("Failed to create task", error);
        } finally {
            setSubmitting(false);
        }
    };

    const deleteTask = async (id: string) => {
        setTasks(tasks.filter((t) => t._id !== id)); // Optimistic update
        try {
            await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        } catch (error) {
            console.error("Failed to delete task", error);
            fetchTasks(); // Revert on error
        }
    };

    const toggleStatus = async (task: Task) => {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        const updatedTasks = tasks.map((t) =>
            t._id === task._id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks as Task[]);

        try {
            await fetch(`/api/tasks/${task._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error("Failed to update task", error);
            fetchTasks();
        }
    };

    return (
        <div className="min-h-screen">
            {/* Navbar with glass effect */}
            <nav className="glass-card rounded-none border-x-0 border-t-0 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <LayoutGrid className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-sm text-slate-400">
                        Signed in as <span className="font-semibold text-slate-200">{user.email}</span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="border-white/10 text-white bg-white/5 hover:bg-white/10 hover:text-white"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto p-6 space-y-8">

                {/* Profile Section */}
                <div className="glass-card p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                        <UserIcon className="h-5 w-5 text-indigo-400" />
                        Profile Settings
                    </h2>
                    <ProfileForm user={user} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Task Creation - Side Panel on Desktop */}
                    <div className="md:col-span-1">
                        <div className="glass-card p-6 rounded-2xl sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 text-white">Add New Task</h2>
                            <form onSubmit={createTask} className="flex flex-col gap-4">
                                <Input
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="What needs to be done?"
                                    className="glass-input placeholder:text-slate-500"
                                />
                                <Button
                                    type="submit"
                                    disabled={submitting || !newTaskTitle.trim()}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white w-full"
                                >
                                    {submitting ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                                    Add Task
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold text-slate-200">Your Tasks</h2>
                        {loading ? (
                            <div className="flex justify-center p-8">
                                <div className="h-8 w-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="text-center p-12 glass-card rounded-2xl border-dashed border-white/10 text-slate-500">
                                <p>No tasks yet. Create one to get started!</p>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {tasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="group flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/5 transition-all duration-200 border-white/5 hover:border-indigo-500/30"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => toggleStatus(task)} className="text-slate-500 hover:text-emerald-400 transition-colors">
                                                {task.status === "completed" ? (
                                                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                                                ) : (
                                                    <Circle className="h-6 w-6" />
                                                )}
                                            </button>
                                            <span className={cn("text-base font-medium text-slate-200", task.status === "completed" && "text-slate-500 line-through decoration-slate-600")}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                            onClick={() => deleteTask(task._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
