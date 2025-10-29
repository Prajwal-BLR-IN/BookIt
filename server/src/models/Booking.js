import mongoose from "mongoose";

// Function to generate a random booking reference like "HUF568SO"
const generateRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

// Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    bookingRef: {
      type: String,
      default: generateRef,
      unique: true,
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    slot: {
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
    qty: { type: Number, default: 1 }, // for future flexibility (multi-ticket)
    promoCode: { type: String },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create and export Booking model
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
