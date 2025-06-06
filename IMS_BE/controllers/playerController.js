import playerModel from "../models/playerModel.js";

export const getPlayers = async (req, res) => {
  try {
    const players = await playerModel.find();
    if (!players) {
      return res.json({
        message: "No players found",
        success: false
      });
    }
    return res.json({
      message: "Players retrieved successfully",
      success: true,
      data: players
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }
};
export const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerModel.findById(id);
    if (!player) {
      return res.json({
        message: "Player not found",
        success: false
      });
    }
    return res.json({
      message: "Player retrieved successfully",
      success: true,
      data: player
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }
};
export const getPlayerByName = async (req, res) => {
  const { name } = req.params;
  try {
    const player = await playerModel.findById(name);
    if (!player) {
      return res.json({
        message: "Player not found",
        success: false   
       })
    return res.json({
      message: "Player retrieved successfully",
      success: true,
      data: player
    });
  } }catch (error) {
    return res.json({
      message: "Internal server error",
      success: false
    });
  }
};
export const addPlayer = async (req, res) => {
    const {jersey_number, matches_played, runs, wickets, catches, stumpings, role } = req.body;
    const { id } = req.user; 
    try {
        const newPlayer = new playerModel({
            player: id,
            jersey_number,
            matches_played,
            runs,
            wickets,
            catches,
            stumpings,
            role
        });
        await newPlayer.save();
        return res.status(201).json({
            message: "Player added successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { jersey_number, matches_played, runs, wickets, catches, stumpings, role } = req.body;
  try {
    const updatedPlayer = await playerModel.findByIdAndUpdate(id, {
      jersey_number,
      matches_played,
      runs,
      wickets,
      catches,
      stumpings,
      role
    }, { new: true });
    
    if (!updatedPlayer) {
      return res.status(404).json({
        message: "Player not found",
        success: false
      });
    }
    
    return res.status(200).json({
      message: "Player updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
}   
export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPlayer = await playerModel.findByIdAndDelete(id);
    if (!deletedPlayer) {
      return res.status(404).json({
        message: "Player not found",
        success: false
      });
    }
    return res.status(200).json({
      message: "Player deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
} 