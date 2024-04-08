import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUsersId = req.user._id;

    const allUsersExceptLoggedUser = await User.find({
      _id: { $ne: loggedInUsersId },
    }).select("-password");

    res.status(200).json(allUsersExceptLoggedUser);
  } catch (error) {
    console.log({ "Error in getUsersForSidebar": error.message });
    res.status(500).json({ errror: "Internal Server Error" });
  }
};
