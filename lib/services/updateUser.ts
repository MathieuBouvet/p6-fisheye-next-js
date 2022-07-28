import { UpdateUserResponse } from "@lib/controllers/users/userController";
import { UserData } from "@lib/controllers/users/helpers/userValidations";
import apiRoutes from "@lib/routes/apiRoutes";
import apiClient from "@lib/apiClient";

async function updateUser(userId: number, userData: UserData) {
  return await apiClient.put<UpdateUserResponse>(
    apiRoutes.user(userId),
    userData
  );
}

export default updateUser;
