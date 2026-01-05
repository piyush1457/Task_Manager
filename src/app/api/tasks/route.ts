import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { GET as authHandler } from "../auth/[...nextauth]/route"; // Hack to get options if exported, or just use imports
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User"; // Ensure User is loaded
// Need auth options to get session correctly in server components vs implementation details
// For now, I'll rely on getServerSession working with the handler's config if possible or extract config to lib/auth.ts
// To keep it simple and fast, I will extract auth options if I can, or use a workaround.
// The cleanest way in Next 13+ is to have authOptions exported from a shared file.
// I will just use a simple check for now:
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(); // This might need authOptions passed
        // Actually, getServerSession requires authOptions. 
        // I need to refactor auth route to export authOptions.

        // Alternative: Use getToken which is easier for API routes
        const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const tasks = await Task.find({ userId: token.sub }).sort({ createdAt: -1 });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("GET Tasks Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, status } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        await connectDB();

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            userId: token.sub,
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("POST Task Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
