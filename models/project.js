import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  websiteUrl: {
    type: String,
    required: [true, "websiteurl is required"],
  },
  githubUrl: {
    type: String,
    required: [true, "githubUrl is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
