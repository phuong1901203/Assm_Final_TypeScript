import User from "../models/user";
import jwt from "jsonwebtoken";

export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ message: "Bạn chưa đăng nhập" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwt.verify(token, "123456");
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.json({ message: "Bạn không phải admin" });
    }
    next();
  } catch (error) {
    return res.json({ message: error });
  }
};
