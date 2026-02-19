import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uname, email, password, phone } = body;

        // Validate input
        if (!uname || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();
        try {
            await client.query(
                `INSERT INTO users (uname, email, password, phone)
         VALUES ($1, $2, $3, $4)`,
                [uname, email, hashedPassword, phone || null]
            );

            return NextResponse.json({
                success: true,
                message: "User registered successfully"
            });
        } finally {
            client.release();
        }
    } catch (error) {
        const pgError = error as { code?: string };
        if (pgError.code === "23505") { // Unique violation
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 409 }
            );
        }
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
