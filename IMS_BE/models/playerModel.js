import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true
  },
  matchesPlayed: {
    type: Number,
    default: 0
  },
  runs: {
    type: Number,
    default: 0
  },
  wicketes: {
    type: Number,
    default: 0
  },
  jerseyNumber: {
    type: Number
  },
  teamId: {
    type: mongoose.Schema.ObjectId,
    ref: "team"
  },
  catches: {
    type: Number,
    default: 0
  },
  role: [
    {
      type: String,
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
      required: true
    }
  ]
});
