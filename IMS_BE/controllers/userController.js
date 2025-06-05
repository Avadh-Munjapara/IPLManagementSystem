
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