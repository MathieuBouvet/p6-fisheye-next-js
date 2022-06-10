import { NextQueryField } from "@utils/typeUtils";
import HttpError from "@utils/HttpError";
import Cookies from "cookies";

import controller from "@utils/controller";
import validation from "@utils/validation";
import isRequired from "@lib/validators/isRequired";
import isNotArray from "@lib/validators/isNotArray";

import findUserByEmail from "@lib/model/users/findUserByEmail";
import isPasswordCorrect from "@lib/model/users/isPasswordCorrect";
import generateTokens from "@lib/auth/generateTokens";

const isString = (field: NextQueryField) => isNotArray(isRequired(field));

const validateEmail = validation(isString, "email");

const validatePassword = validation(isString, "password");

export type LoginResponse = {
  csrfToken: string;
};

const loginController = controller({
  POST: async (req, res): Promise<LoginResponse> => {
    const email = validateEmail(req.body.email);
    const password = validatePassword(req.body.password);

    const user = await findUserByEmail(email);
    if (user == null || !isPasswordCorrect(user, password)) {
      throw new HttpError(401, "Invalid user");
    }

    const [authToken, csrfToken] = await generateTokens(user);

    const cookies = new Cookies(req, res);
    cookies.set("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return { csrfToken };
  },
});

export default loginController;
