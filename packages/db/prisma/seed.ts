import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@gmail.com',
    },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('Admin created:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
