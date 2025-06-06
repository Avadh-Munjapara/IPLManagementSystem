import teamModel from "../models/teamModel.js";
import imageUpload from "../utils/cloudinaryUpload.js";
import dotenv from "dotenv";
dotenv.config();
export const createTeam = async (req, res) => { 
  try {
    const { name, tag_line, state, short_name, captain, squad,owners } = req.body;
    const { logo } = req?.files;
    if (!name || !tag_line || !state || !logo || !owners) {
      res.status(400).json({
        success: false,
        message: "required fields are missing!",
      });
    }
    if (logo) {
      var logoUpload = await imageUpload(logo, process.env.FOLDERNAME);
    }

    const created_team = await teamModel.create({
      name,
      tag_line,
      state,
      owners,
      logo: logoUpload?.secure_url || null,
      sort_name: short_name || null,
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

export const editTeamForTo = async (req, res) => {
  try {
    const { id, name, tag_line, short_name, captain,squad } = req.body;
    const logo=req?.files?.logo;
    const team = await teamModel.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }
    if(logo){
    var logoUpload = await imageUpload(logo, process.env.FOLDERNAME);
    }

    const updatedTeam = await teamModel.findByIdAndUpdate(
      id,
      {
        name: name || team.name,
        tag_line: tag_line || team.tag_line,
        short_name: short_name || team.short_name,
        captain: captain || team.captain,
        logo: logoUpload?.secure_url || team.logo,
        squad: squad || team.squad,
      },
      { new: true }
    );  

    return res.status(200).json({
      success: true,
      message: "Team updated successfully",
      updatedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const editTeamForAdmin = async (req, res) => {
  try {
    const { id, state, captain, squad } = req.body;

    const team = await teamModel.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const updatedTeam = await teamModel.findByIdAndUpdate(
      id,
      {
        state: state || team.state,
        captain: captain || team.captain,
        squad: squad || team.squad,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Team updated successfully",
      updatedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeTeam = async (req, res) => {
  try {
        console.log(req);
    const { id } = req.body;

    const team = await teamModel.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    const deletedTeam = await teamModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      deletedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await teamModel
      .find()
      .populate("captain", "name role jersey_number")
      .populate("squad", "name role jersey_number")
      .populate("owners", "name");

    return res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Team ID is required",
      });
    }
    const team = await teamModel
      .findOne({ _id: id })
      .populate("captain", "name role jersey_number")
      .populate("squad", "name role jersey_number")
      .populate("owners", "name");
    return res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTeamsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    if (!ownerId) {
      return res.status(400).json({
        success: false,
        message: "Owner ID is required",
      });
    }
    const team = await teamModel
      .findOne({ owners: {$in:[ownerId] }})
      .populate("captain", "name role jersey_number")
      .populate("squad", "name role jersey_number")
      .populate("owners", "name");
    return res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};