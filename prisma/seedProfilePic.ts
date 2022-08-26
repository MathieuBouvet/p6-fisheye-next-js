import { User } from "@prisma/client";

import seedFileToBase64 from "prisma/seedFileToBase64";
import setProfilePic from "@lib/services/profilePic/setProfilePic";

async function seedProfilePic(user: User) {
  const filePath = `profilePics/${user.profilePicUrl}`;

  try {
    const profilePicSeed = await seedFileToBase64(filePath);

    await setProfilePic(user, profilePicSeed);

    console.log(`Done seeding ${user.email} profile pic`);
  } catch (err) {
    console.log(`Skip seeding for ${user.email} -> ${err}`);
  }
}

export default seedProfilePic;
