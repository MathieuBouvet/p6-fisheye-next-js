import { getClientIp } from "request-ip";
import validation from "./validation";
import { NextApiRequest } from "next";
import isRequired from "@lib/validators/isRequired";

const validateIp = validation(
  (req: NextApiRequest) => isRequired(getClientIp(req)),
  "ip address"
);

export default validateIp;
