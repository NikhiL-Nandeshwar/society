import { PrismaClient } from '@/generated/prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10); // your desired password

  const user = await prisma.user.create({
    data: {
      name: 'Nikhil',
      email: 'nikhil@example.com',
      password: hashedPassword,
      role: 'resident', // or 'admin'
    },
  });

  console.log('User created:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
