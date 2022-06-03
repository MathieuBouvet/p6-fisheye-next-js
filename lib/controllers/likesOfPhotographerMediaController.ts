import { NextQueryField } from "@utils/typeUtils";

import controller from "@utils/controller";
import validation from "@utils/validation";
import validateIp from "@utils/validateIp";

import isRequired from "@lib/validators/isRequired";
import isNotArray from "@lib/validators/isNotArray";
import toInteger from "@lib/validators/toInteger";

import getLikesOfPhotographerMedia from "@lib/model/getLikesOfPhotographerMedia";

const validatePhotographerId = validation(
  (field: NextQueryField) => toInteger(isNotArray(isRequired(field))),
  "photgrapherId"
);

const likesOfPhotographerMediaController = controller({
  GET: async req => {
    const photographerId = validatePhotographerId(req.query.photographerId);
    const ip = validateIp(req);

    return getLikesOfPhotographerMedia(ip, photographerId);
  },
});

export default likesOfPhotographerMediaController;
