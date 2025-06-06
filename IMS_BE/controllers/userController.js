import userModel from "../models/userModel.js";

export const getUser = (req, res) => {
  try {
    const user = req.user;    
    if (!user) {
      return res.json({
        message: "User not found",
        success: false
      });
    }
    return res.json({
      message: "User retrieved successfully",
      success: true,
      user:user
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id,- "-password -__v");
    if (!user) {
      return res.json({
        message: "User not found",
        success: false
      });
    }
    return res.json({
      message: "User retrieved successfully",
      success: true,
      user: user
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }   
}              
export const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        message: "User not found",
        success: false
      });
    }

    return res.json({
      message: "User updated successfully",
      success: true,
      user: updatedUser
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }
};