import makeRequireOwnership from "@lib/auth/accessControl/makeRequireOwnership";

const requireMatchingUserIds = makeRequireOwnership((userId: number) => userId);

export default requireMatchingUserIds;
