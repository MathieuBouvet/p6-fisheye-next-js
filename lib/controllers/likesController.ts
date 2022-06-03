import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiResponse } from "next";
import { NextQueryField } from "@utils/typeUtils";
import HttpError from "@utils/HttpError";

import controller from "@utils/controller";
import validation from "@utils/validation";
import validateIp from "@utils/validateIp";

import isRequired from "@lib/validators/isRequired";
import isNotArray from "@lib/validators/isNotArray";
import toInteger from "@lib/validators/toInteger";

import likeMedium from "@lib/model/likeMedium";
import unlikeMedium from "@lib/model/unlikeMedium";

const validateMediumId = validation(
  (field: NextQueryField) => toInteger(isNotArray(isRequired(field))),
  "medium id"
);

function likeMediumErrorHandler(
  err: unknown,
  res: NextApiResponse,
  mediumId: number
) {
  if (!(err instanceof PrismaClientKnownRequestError)) {
    throw err;
  }
  switch (err.code) {
    case "P2002": {
      // this like already exists, nothing to do
      res.status(204);
      return;
    }
    case "P2025": {
      throw new HttpError(404, `medium ${mediumId} not found`);
    }
    default:
      throw err;
  }
}

function unlikeMediumErrorHandler(err: unknown, res: NextApiResponse) {
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
    // the visitor ip was not found, nothing to do
    res.status(204);
    return;
  }
  throw err;
}

const likesController = controller({
  POST: async (req, res) => {
    const mediumId = validateMediumId(req.query.mediumId);
    const visitorIp = validateIp(req);

    try {
      await likeMedium({ mediumId, visitorIp });
      res.status(201);
      return {
        visitorIp,
        mediumId,
      };
    } catch (err) {
      likeMediumErrorHandler(err, res, mediumId);
    }
  },
  DELETE: async (req, res) => {
    const mediumId = validateMediumId(req.query.mediumId);
    const visitorIp = validateIp(req);

    try {
      await unlikeMedium({ mediumId, visitorIp });
      res.status(204);
    } catch (err) {
      unlikeMediumErrorHandler(err, res);
    }
  },
});

export default likesController;
