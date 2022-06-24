import Cookies from "cookies";

import controller from "@utils/controller";

const logoutController = controller({
  POST: async (req, res) => {
    const cookies = new Cookies(req, res);
    cookies.set("auth_token", undefined, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(204);
  },
});

export default logoutController;
