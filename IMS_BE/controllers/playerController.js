import playerModel from "../models/playerModel.js";
import userModel from "../models/userModel.js";
import uploadimageclodinary from "../utils/cloudinaryUpload.js";

export const getPlayers = async (req, res) => {
  try {
    const players = await playerModel.find().populate('player', 'name  profile_pic').populate('playing_for' , 'name'); // populate if you want user info
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
  const { id } = req.params; // id is the user id
  try {
    // Find the player document where 'player' field matches the user id
    const player = await playerModel.findOne({ player: id }).populate('player', 'name email profile_pic'); // populate if you want user info
    if (!player) {
      return res.json({
        message: "Player not found",
        success: false
      });
    }
    return res.json({
      message: "Player retrieved successfully",
      success: true,
      player // return as 'player' for frontend consistency
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
    const {name,email,jersey_number, matches_played, runs,fours,sixes, wickets, catches, stumpings, role } = req.body;
    const profile = req.file;
    try {

      const user =  await userModel.findOne({ email: email });
      user.role = "PLAYER";
      const id = user._id;
      user.save();
        const newPlayer = new playerModel({
            player: id,
            jersey_number,
            matches_played,
            runs,
            fours,
            sixes,
            wickets,
            catches,
            stumpings,
            role
        });
        await newPlayer.save();
        return res.json({
            message: "Player added successfully",
            success: true,
        });
    } catch (error) {
      console.log(error);
      
        return res.json({
            message: "Internal server error",
            success: false
        });
    }
}
export const updatePlayer = async (req, res) => {
  const { jersey_number, matches_played, runs,fours,sixes, wickets, catches, stumpings, role , id } = req.body;
  const profile = req.file;
  
  try {

    if (profile) {
      var logoUpload = await uploadimageclodinary(profile);      
       const updatedPlayer = await playerModel.findById(id).populate('player', 'name email profile_pic');
       if(updatePlayer){
        console.log(updatePlayer);
        updatedPlayer.player.profile_pic = logoUpload.secure_url;
         const res= await updatedPlayer.player.save();
       }
    }
    const updatedPlayer = await playerModel.findByIdAndUpdate(id, {
      jersey_number,
      matches_played,
      runs,
      fours,
      sixes,
      wickets,
      catches,
      stumpings,
      role
    }, { new: true });


    
    if (!updatedPlayer) {
      return res.json({
        message: "Player not found",
        success: false
      });
    }
    
    return res.json({
      message: "Player updated successfully",
      success: true,
    });
  } catch (error) {
          console.log(error)

    return res.json({
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