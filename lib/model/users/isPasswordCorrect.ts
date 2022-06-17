import crypto from "crypto";
import { User } from "@prisma/client";

function isPasswordCorrect(user: User, inputPassword: string): boolean {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.passwordSalt, 1000, 64, "sha512")
    .toString("hex");

  return inputHash === user.password;
}

export default isPasswordCorrect;
