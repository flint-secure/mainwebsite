import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, company } = body;

        // Log to server console for now
        console.log("Waitlist submission:", { name, email, company, timestamp: new Date().toISOString() });

        // In production, save to database or send to email service
        // For now, just acknowledge the submission

        return NextResponse.json(
            { success: true, message: "Added to waitlist" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid request" },
            { status: 400 }
        );
    }
}
