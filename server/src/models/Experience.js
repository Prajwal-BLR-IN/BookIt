import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalSlots: { type: Number, required: true, default: 6 }, // how many available in total
  bookedCount: { type: Number, default: 0 },                 // how many booked so far
});

// Virtual field for remaining slots (computed automatically)
slotSchema.virtual("remaining").get(function () {
  return Math.max(this.totalSlots - this.bookedCount, 0);
});

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    availableSlots: [slotSchema],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
 
export default Experience;
