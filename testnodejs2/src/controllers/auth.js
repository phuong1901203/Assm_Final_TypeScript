import User from "../models/user";
import { signupSchema, signinSchema } from "../Schemas/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// kiểm tra dữ liệu người dùng,
// kiểm tra email có tồn tại chưa,
// mã hóa mật khẩu,
// gửi lên database
// không trả về mật khẩu về client
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({ message: errors });
    }
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.json({ message: "Email đã tồn tại" });
    }
    // mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // không trả về client mật khẩu
    user.password = undefined;
    return res.json({
      message: "Đăng kí tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};
// vaidate dữ liệu từ client
// kiểm tra tài khoản có tồn tại không;
// kiểm tra mật khẩu có đúng không;
// tạo ra một token trả về client
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({ messages: errors });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Tài khoản không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Mật khẩu không đúng" });
    }
    const token = jwt.sign({ id: user._id }, "123456", {
      expiresIn: "1d",
    });
    return res.json({
      message: "Đăng nhập thành công",
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.json({ message: error });
  }
};
