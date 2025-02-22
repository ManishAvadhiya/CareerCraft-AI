import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const result = await db.user.update({
      where: { id: user.id },
      data: {
        industry: body.industry,
        experience: body.experience,
        bio: body.bio,
        skills: body.skills,
      },
    });

    return NextResponse.json({ success: true, user: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
