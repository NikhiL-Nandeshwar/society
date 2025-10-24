import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
