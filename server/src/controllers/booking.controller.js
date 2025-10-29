import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

// @desc Create a booking
// @route POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { experienceId, name, email, slot, qty, promoCode, subtotal, tax, finalPrice } = req.body;

    // Validate fields
    if (!experienceId || !name || !email || !slot?.date || !slot?.time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Find the correct slot
    const targetSlot = experience.availableSlots.find(
      (s) => s.date === slot.date && s.time === slot.time
    );

    if (!targetSlot) {
      return res.status(400).json({ message: "Invalid slot selection" });
    }

    // Check if slots are available
    const remaining = targetSlot.totalSlots - targetSlot.bookedCount;
    if (remaining <= 0) {
      return res.status(400).json({ message: "Slot sold out" });
    }

    // Create the booking
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

    // Increment the slot's booked count
    targetSlot.bookedCount += 1;
    await experience.save();

    // Return booking confirmation
    res.status(201).json({
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
