import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, age, phone } = await req.json();

        if (!name || name.length < 2) {
            return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
        }

        await connectDB();

        const updatedUser = await User.findByIdAndUpdate(
            session.user.id,
            { name, age, phone },
            { new: true }
        );

        return NextResponse.json({ message: "Profile updated", user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
