import { User } from "../models/user.model.js";

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("accessToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
