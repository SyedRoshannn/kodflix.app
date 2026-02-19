import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    // Clear the token cookie
    cookies().set({
        name: "token",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0), // Set expiration to the past
    });

    return NextResponse.json({ success: true });
}
