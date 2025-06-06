import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  jersey_number: {
    type: String,
  },
  mathces_played:{
    type: Number,
    default: 0,
  },
  runs: {
    type: Number,
    default: 0,
  },
  fours:{
    type: Number,
    default: 0,
  },
  sixes:{
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  catches: {
    type: Number,
    default: 0,
  },
  stumpings: {
    type: Number,
    default: 0,
  },
  strike_rate:{
    type: Number,
    default: 0,
  },
  role:{
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
    default: "batsman",
  },
  playing_for:{
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  }
});

const playerModel = mongoose.model("Player", playerSchema);

export default playerModel;
