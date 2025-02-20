import { faker } from '@faker-js/faker';
import { db } from '@/db/db';
import { statuses, tasks, users } from '@/db/schema';

async function seed() {
  const statusesMap = [
    { label: 'To Do', value: 'to_do' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
  ];
  for (const status of statusesMap) {
    await db
      .insert(statuses)
      .values({ label: status.label, value: status.value });
  }

  const userIds = [];
  for (let i = 0; i < 5; i++) {
    const user = await db
      .insert(users)
      .values({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
      })
      .returning({ id: users.id });
    userIds.push(user[0].id);
  }

  const statusRecords = await db.select().from(statuses);
  const statusIds = statusRecords.map((status) => status.id);

  for (let i = 0; i < 20; i++) {
    await db.insert(tasks).values({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      statusId: faker.helpers.arrayElement(statusIds),
      userId: faker.helpers.arrayElement(userIds),
    });
  }

  console.log('Seeding completed.');
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
