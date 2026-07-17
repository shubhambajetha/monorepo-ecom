// prisma/seed.ts
//
// Run with: npx tsx prisma/seed.ts
// (or via `prisma db seed`, see package.json config)
//
// Requires: npm i -D @faker-js/faker tsx

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { catalog } from './data/catalog';
import { getRandomProductTemplate, ProductType } from './data/productTemplates';

const connectionString = process.env['DATABASE_URL'];

if (!connectionString) {
  throw new Error('DATABASE_URL is not set for Prisma seed');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------
// Config
// ---------------------------------------------
const MIN_PRODUCTS_PER_COLLECTION = 200;
const MAX_PRODUCTS_PER_COLLECTION = 220;

const SIZE_POOLS: Record<ProductType, string[]> = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  footwear: ['6', '7', '8', '9', '10', '11', '12'],
  accessories: ['One Size'],
};

const COLOR_POOL = [
  'Black',
  'White',
  'Navy',
  'Grey',
  'Beige',
  'Olive',
  'Maroon',
  'Blue',
  'Red',
  'Brown',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function uniqueSlug(base: string): string {
  return `${slugify(base)}-${faker.string.alphanumeric(5).toLowerCase()}`;
}

function generateSku(brand: string): string {
  return `${brand.slice(0, 3).toUpperCase()}-${faker.string.alphanumeric(8).toUpperCase()}`;
}

function pickSizes(type: ProductType): string[] {
  const pool = SIZE_POOLS[type];
  if (type === 'accessories') return pool;
  const count = faker.number.int({ min: 3, max: pool.length });
  return faker.helpers.arrayElements(pool, count).sort((a, b) => pool.indexOf(a) - pool.indexOf(b));
}

function pickColors(): string[] {
  return faker.helpers.arrayElements(COLOR_POOL, faker.number.int({ min: 1, max: 3 }));
}

function generateImages(seedText: string, count = 4): string[] {
  return Array.from({ length: count }, (_, i) =>
    `https://picsum.photos/seed/${encodeURIComponent(seedText)}-${i}/600/600`
  );
}

function generateCollectionBanner(seedText: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seedText)}-banner/1200/600`;
}

// ---------------------------------------------
// Seed: Admin user
// ---------------------------------------------
async function seedAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@gmail.com',
    },
    update: {
      firstName: 'Admin',
      lastName: 'User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
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

// ---------------------------------------------
// Seed: Catalog (Category -> Subcategory -> Collection -> Product)
// ---------------------------------------------
async function seedCatalog() {
  console.log('Clearing existing catalog data...');
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();

  let totalProducts = 0;

  for (const cat of catalog) {
    console.log(`Category: ${cat.name}`);
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
      },
    });

    for (const sub of cat.subcategories) {
      console.log(`  Subcategory: ${sub.name}`);
      const subcategory = await prisma.subcategory.create({
        data: {
          name: sub.name,
          slug: sub.slug,
          image: sub.image,
          isFeatured: sub.isFeatured ?? false,
          categoryId: category.id,
        },
      });

      for (const col of sub.collections) {
        const collection = await prisma.collection.create({
          data: {
            name: col.name,
            slug: col.slug,
            bannerImage: (col as { bannerImage?: string }).bannerImage ?? generateCollectionBanner(col.slug),
            subcategoryId: subcategory.id,
          },
        });

        const productCount = faker.number.int({
          min: MIN_PRODUCTS_PER_COLLECTION,
          max: MAX_PRODUCTS_PER_COLLECTION,
        });

        const productsData = Array.from({ length: productCount }).map(() => {
          const { brand, model, title, type } = getRandomProductTemplate(collection.slug);

          const price = faker.number.int({ min: 799, max: 8999 });
          const hasDiscount = faker.datatype.boolean({ probability: 0.4 });
          const discountPrice = hasDiscount
            ? Math.round(price * faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 2 }))
            : null;

          const slug = uniqueSlug(title);
          const images = generateImages(slug);

          return {
            title,
            slug,
            description: faker.commerce.productDescription(),
            brand,
            sku: generateSku(brand),
            price,
            discountPrice,
            stock: faker.number.int({ min: 0, max: 250 }),
            thumbnail: images[0],
            images,
            sizes: pickSizes(type),
            colors: pickColors(),
            rating: faker.number.float({ min: 2.5, max: 5, fractionDigits: 1 }),
            isFeatured: faker.datatype.boolean({ probability: 0.15 }),
            isActive: true,
            collectionId: collection.id,
          };
        });

        await prisma.product.createMany({ data: productsData });
        totalProducts += productsData.length;
        console.log(`    Collection: ${col.name} -> ${productsData.length} products`);
      }
    }
  }

  console.log(`Catalog done. Seeded ${totalProducts} products total.`);
}

// ---------------------------------------------
// Main
// ---------------------------------------------
async function main() {
  await seedAdmin();
  await seedCatalog();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
