import mongoose, { Mongoose } from "mongoose";

const productRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    kit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    request_by: {
      type: mongoose.ObjectId,
    },
    owner_by: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("request-product", productRequestSchema);