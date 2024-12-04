import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Kid creation
  for (let i = 0; i < 10; i++) {
    await prisma.kid.create({
      data: {
        name: faker.name.fullName(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        isGood: faker.datatype.boolean(),
      },
    });
  }

  // Toy creation
  for (let i = 0; i < 10; i++) {
    await prisma.toy.create({
      data: {
        name: faker.commerce.productName(),
        material: faker.helpers.arrayElement(['wood', 'metal', 'plastic', 'other']),
        weight: faker.number.float({ min: 1, max: 8, multipleOf:0.5 }),
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seeding completed');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  });
