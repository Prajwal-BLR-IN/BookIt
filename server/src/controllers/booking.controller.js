import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js"

export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      name,
      email,
      slot,
      qty,
      promoCode,
      subtotal,
      tax,
      finalPrice,
    } = req.body;

    if (!experienceId || !name || !email || !slot?.date || !slot?.time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    const targetSlot = experience.availableSlots.find(
      (s) => s.date === slot.date && s.time === slot.time
    );

    if (!targetSlot) return res.status(400).json({ message: "Invalid slot selection" });

    const remaining = targetSlot.totalSlots - targetSlot.bookedCount;
    if (remaining <= 0)
      return res.status(400).json({ message: "Slot sold out" });

    if (qty > remaining)
      return res.status(400).json({ message: `Only ${remaining} slot(s) left for this time.` });

    const booking = new Booking({
      experienceId,
      name,
      email,
      slot,
      qty,
      promoCode,
      subtotal,
      tax,
      finalPrice,
    });

    await booking.save();

    targetSlot.bookedCount += qty;
    await experience.save();

    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      bookingRef: booking.bookingRef,
      experienceTitle: experience.title,
      slot,
      finalPrice,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
