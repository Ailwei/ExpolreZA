import db from './db/database';
import fs from 'fs/promises';
import path from 'path';

async function seedActivities() {
  // Adjust the path if your file is elsewhere

const filePath = path.join(__dirname, "data/generated_Activities.json");  const file = await fs.readFile(filePath, 'utf-8');
  const { activities } = JSON.parse(file);

  for (const act of activities) {
    await db.activity.upsert({
      where: { locationKey: act.locationKey },
      update: {
        data: act.data,
        timestamp: act.timestamp ? new Date(act.timestamp) : new Date(),
        updatedAt: new Date(),
      },
      create: {
        locationKey: act.locationKey,
        data: act.data,
        timestamp: act.timestamp ? new Date(act.timestamp) : new Date(),
      },
    });
  }

  console.log('Seeding complete!');
  await db.$disconnect();
}

seedActivities().catch(e => {
  console.error(e);
  db.$disconnect();
});