import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET is not set");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT id, uname, email, password FROM users WHERE email = $1",
                [email]
            );

            const user = result.rows[0];
            if (!user) {
                return NextResponse.json(
                    { error: "Invalid email or password" },
                    { status: 401 }
                );
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return NextResponse.json(
                    { error: "Invalid email or password" },
                    { status: 401 }
                );
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, uname: user.uname },
                jwtSecret,
                { expiresIn: "7d" }
            );

            // Set HTTP-only cookie
            cookies().set({
                name: "token",
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });

            return NextResponse.json({ success: true, user: { id: user.id, uname: user.uname, email: user.email } });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
