import makeRequireOwnership from "@lib/auth/accessControl/makeRequireOwnership";
import { User } from "@prisma/client";

const requireOwnershipOfUserData = makeRequireOwnership((user: User) => user.id);

export default requireOwnershipOfUserData;
