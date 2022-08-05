import controller from "@utils/controller";

import extractAuthToken from "@lib/auth/extractAuthToken";
import requireLogin from "@lib/auth/accessControl/requireLogin";
import requireRole from "@lib/auth/accessControl/requireRole";
import suggestTag from "@lib/model/tags/suggestTag";

import validation from "@utils/validation";
import isRequired from "@lib/validators/isRequired";
import { isString } from "@lib/validators/isString";

import { ROLE } from "@lib/auth/roles";

const validateTagName = validation(
  (field: any) => isRequired(isString(field)),
  "tagName in body"
);

const suggestionsController = controller({
  POST: async (req, res) => {
    const authToken = extractAuthToken(req, res);
    requireLogin(authToken);
    requireRole(authToken, ROLE.SIMPLE_USER);

    const tagName = validateTagName(req.body.tagName);

    const tag = await suggestTag(tagName, authToken.userId);

    res.status(201);
    return tag;
  },
});

export default suggestionsController;
