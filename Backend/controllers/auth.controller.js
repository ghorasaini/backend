import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../lib/sendMail.js";
import { forgotPasswordTemplate } from "../lib/templates/forgotPassword.js";
import { json } from "stream/consumers";
//steps
// validate user input required fields
// check if user already exist or not
// hash the password
// save

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  // email password both required validate
  // user exists or not check
  // password compare
  // token generate
  // send response
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.status(400).json({
      message: "User does not exist with this email",
    });
  }

  const isMatch = await bcrypt.compare(password, existUser.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: existUser._id, email: existUser.email },
    "jwtsecret",
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    message: "Login success",
    user: existUser,
    token: token,
  });
};

const getMyProfile = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect old password",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  // email submit
  //  mail tocken send
  // token verify
  // password change

  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "user doesnot exist" });
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();
  // [100000, 999999]. 6digit otp
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();
  await sendMail({
    to: user.email,
    subject: "Password Reset request",
    text: "password reset request",
    html: forgotPasswordTemplate(user.name, token),
  });
  res.json({
    message: "password reset token send to mail",
  });
};

const verifyResetToken = async (req, res) => {
  try {
    const { email, token } = req.body;
    console.log(token);
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid or expired token",
      });
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.resetVerified = true;
    await user.save();

    res.status(200).json({
      message: "token is valid",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server  error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!user.resetVerified) {
      return res.status(403).json({
        messgae: "OTP not verified",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetVerified = false;
    await user.save();

    res.status(200).json({
      message: "password updated",
    });
  } catch (error) {}
};

// const email = async (req, res) => {

//   try {
//     const userId = req.user.id;
//     const { newEmail} = req.body;
//      const user = await user.findById(userId);
//      if (!user) {
//       return res.status(400).json({
//         message: "User not found",

//       });
//      }
//      const hashedEmail = await bcrypt.hash(newEmail, 10);
//      user.email = hashedEmail;
//      await user.save();
//      res.status(200).json({
//       messege:"email changed",
//      });

//   }

//   catch(error){
//     console.log (error);
//     res.status(500).json({
//       message:"Internal server error",
//     })

//   }
// }

export {
  createUser,
  login,
  getMyProfile,
  changePassword,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};
