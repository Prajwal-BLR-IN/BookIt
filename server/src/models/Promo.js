import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["PERCENT", "FLAT"], required: true },
  value: { type: Number, required: true }, // e.g. 10 for 10%, 100 for ₹100 flat
});

const Promo = mongoose.models.Promo || mongoose.model("Promo", promoSchema);

export default Promo;
