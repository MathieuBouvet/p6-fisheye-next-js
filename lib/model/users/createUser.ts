import crypto from "crypto";
import prisma from "@lib/model/prisma";

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePicUrl?: string;
  profilePicDominantColor?: string;
};

async function createUser({
  email,
  firstName,
  lastName,
  password,
  profilePicUrl,
  profilePicDominantColor,
}: CreateUserParams) {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: passwordHash,
      passwordSalt: salt,
      isAdmin: false,
      profilePicDominantColor,
      profilePicUrl,
    },
  });
}

export default createUser;
