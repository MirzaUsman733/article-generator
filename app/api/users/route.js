// File: "users.js" in "app/api/users"

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const userData = await User.find({}).select("_id name email role");
        console.log("userData: ", userData);
        return NextResponse.json({ userData });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ status: 500, message: 'Internal Server Error' });
    }
}
