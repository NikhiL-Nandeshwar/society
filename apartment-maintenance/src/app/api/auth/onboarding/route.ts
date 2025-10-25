import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, mobile, wing, flatNumber, password } = await req.json();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new resident
    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        wing,
        flatNumber,
        password: hashedPassword,
        role: 'resident',
      },
    });

    return NextResponse.json({ 
      message: 'Resident onboarded successfully', 
      user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, wing: user.wing, flat: user.flatNumber } 
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
