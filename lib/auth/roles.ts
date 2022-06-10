export enum ROLE {
  ADMIN = "ADMIN",
  PHOTOGRAPHER = "PHOTOGRAPHER",
  ANONYMOUS = "ANONYMOUS",
}

const rolesHierarchy: { [role in ROLE]: ROLE[] } = {
  ADMIN: [ROLE.PHOTOGRAPHER],
  PHOTOGRAPHER: [ROLE.ANONYMOUS],
  ANONYMOUS: [],
};

function isRoleGranted(currentRole: ROLE, roleToCheck: ROLE): boolean {
  if (roleToCheck === currentRole) {
    return true;
  }
  return rolesHierarchy[currentRole].some(role =>
    isRoleGranted(role, roleToCheck)
  );
}

export { isRoleGranted };
