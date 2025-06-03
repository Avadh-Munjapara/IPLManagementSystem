import teamModel from "../models/teammodel";

export const createTeam = async (req, res) => {
  try {
    const { name, tag_line, state, sort_name, captain, squad } = req.body;
    const {logo}=req.files;
    if (!name || !tag_line || !state || !logo) {
      res.status(400).json({
        success: false,
        message: "required fields are missing!",
      });
    }
    const created_team = await teamModel.create({
      name,
      tag_line,
      state,
      sort_name: sort_name || null,
      captain: captain || null,
      squad: squad || [],
    });

    if (created_team) {
      return res.status(200).json({
        success: true,
        message: "team created",
        created_team,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "team not created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
