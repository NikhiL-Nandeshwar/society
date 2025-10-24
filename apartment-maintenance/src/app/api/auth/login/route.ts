import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('user', user)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log('password',password)
    console.log('user.password',user.password)
    // 2. Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('passwordMatch',passwordMatch)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
