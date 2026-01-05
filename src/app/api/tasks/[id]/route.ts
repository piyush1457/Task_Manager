import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();

        await connectDB();

        const task = await Task.findOne({ _id: id, userId: token.sub });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("PUT Task Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        await connectDB();

        const task = await Task.findOneAndDelete({ _id: id, userId: token.sub });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error("DELETE Task Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
