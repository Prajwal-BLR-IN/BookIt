import Promo from "../models/Promo.js";

// @desc Validate a promo code
// @route POST /api/promo/validate
export const validatePromo = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || !subtotal) {
      return res.status(400).json({ message: "Promo code and subtotal are required" });
    }

    // Convert to uppercase for case-insensitive match
    const promo = await Promo.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res.status(404).json({ message: "Invalid promo code" });
    }

    let discount = 0;
    if (promo.discountType === "PERCENT") {
      discount = (subtotal * promo.value) / 100;
    } else if (promo.discountType === "FLAT") {
      discount = promo.value;
    }

    const newTotal = Math.max(subtotal - discount, 0);

    res.json({
      success: true,
      valid: true,
      code: promo.code,
      discount,
      newTotal,
      message: `Promo applied: ${promo.code}`,
    });
  } catch (error) {
    console.error("Error validating promo:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
