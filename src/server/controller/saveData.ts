import db from "../db/database";

export async function saveOverpassElement(element: any) {
  const locationKey = `${element.type}-${element.id}`;
  const timestamp = new Date();

  await db.activity.upsert({
    
    where: { locationKey },
    update: { data: element, timestamp },
    create: {
      
      locationKey,
      data: element,
      timestamp,

    },
    
    
  });
console.log(locationKey, "-", element.tags?.city || element.tags?.["addr:city"] || "Unknown City", "saved to database");}