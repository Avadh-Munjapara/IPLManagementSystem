import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tag_line: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ""
  },
  sort_name: {
    type: String,
    default: ""
  },
  captain: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  squad: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ],
  owner: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ]
});

const teamModel = mongoose.model("teams", teamSchema);

export default teamModel;
