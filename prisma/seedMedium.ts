import { Medium } from "@prisma/client";

import seedFileToBase64 from "prisma/seedFileToBase64";
import setMediumRessource from "@lib/services/media/setMediumRessource";

async function seedMedium(medium: Medium) {
  const filePath = `media/${medium.url}`;

  try {
    const mediumSeed = await seedFileToBase64(filePath);

    await setMediumRessource(medium, mediumSeed);

    console.log(`Done seeding ${medium.title}`);
  } catch (err) {
    console.log(`Skip seeding ${medium.title} -> ${err}`);
  }
}

export default seedMedium;
