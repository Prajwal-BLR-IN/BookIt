import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import useCustomQuery from "../hooks/useQuery";
import type { Experience } from "../types/type";
import ExperienceDetailSkeleton from "../components/ExpienceDetailCardSkeleton";
import { motion } from "motion/react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: experience, isLoading } = useCustomQuery<Experience>(
    `experience-${id}`,
    `/experiences/${id}`,
  );

  // Local states for slot selection
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  //Local states for price calculation
  const [quantity, setQuantity] = useState(1);

  const subtotal = (experience?.price || 0) * quantity;
  const tax = Math.round(subtotal * 0.06); // 6% GST
  const total = subtotal + tax;

  // Get all unique dates
  const uniqueDates = Array.from(
    new Set(experience?.availableSlots.map((slot) => slot.date)),
  );

  // Filter slots for selected date
  const filteredSlots = selectedDate
    ? experience?.availableSlots.filter((slot) => slot.date === selectedDate)
    : [];

  if (isLoading) return <ExperienceDetailSkeleton />;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="my-6 flex cursor-pointer items-center gap-2 text-gray-500"
      >
        <img
          src={assets.arrowIcon}
          alt="arrow icon"
          className="size-5 opacity-65"
        />
        <span className="text-sm leading-tight font-medium">Details</span>
      </button>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Left: experience image & details */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={experience?.image}
            alt="experience image"
            className="mb-4 h-auto w-full rounded-xl object-cover md:max-h-100"
          />
          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="my-8"
          >
            <h2 className="text-2xl leading-8 font-medium">
              {experience?.title}
            </h2>
            <p className="text-[#6C6C6C]">{experience?.description}</p>
          </motion.div>

          {/* --- Choose Date Section --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-2 text-lg leading-6 font-medium">Choose date</h3>
            <div className="flex flex-wrap gap-4">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={`flex h-8 w-17 cursor-pointer items-center justify-center rounded-sm px-3 py-2 text-sm leading-tight font-normal transition ${
                    selectedDate === date
                      ? "bg-primary"
                      : "border border-[#BDBDBD] text-[#838383]"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          </motion.div>

          {/* --- Choose Time Section --- */}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="mb-2 text-lg leading-6 font-medium">
                Choose time
              </h3>
              <div className="flex flex-wrap gap-4">
                {filteredSlots?.map((slot) => {
                  const remaining = slot.totalSlots - slot.bookedCount;
                  const soldOut = remaining <= 0;
                  const isSelected = selectedTime === slot.time;

                  return (
                    <button
                      key={slot.time}
                      disabled={soldOut}
                      onClick={() => !soldOut && setSelectedTime(slot.time)}
                      className={`flex h-8 cursor-pointer items-center justify-center rounded-sm px-3 py-2 text-sm leading-tight font-normal transition ${
                        soldOut
                          ? "cursor-not-allowed bg-[#CCCCCC] text-[#838383]"
                          : isSelected
                            ? "bg-primary"
                            : "border border-[#BDBDBD] text-[#838383]"
                      }`}
                    >
                      {slot.time}
                      <span
                        className={`ml-2 text-xs ${
                          soldOut ? "text-gray-400" : "text-red-500"
                        }`}
                      >
                        {soldOut ? "Sold out" : `${remaining} left`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs leading-4 font-normal text-[#838383]">
                All times are in IST (GMT +5:30)
              </p>
            </div>
          )}

          {/* About info */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="mt-8 mb-2 text-lg leading-6 font-medium">About</h3>
            <p className="rounded-sm bg-[#EEEEEE] px-3 py-2 text-xs leading-4 font-normal text-[#838383]">
              Scenic routes, trained guides, and safety briefing. Minimum age
              10.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Booking Summary Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="sticky top-18 h-max space-y-6 rounded-xl bg-[#EFEFEF] p-6 text-[#656565]"
        >
          <div className="space-y-3 text-sm text-gray-700">
            {/* Starts at */}
            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal text-[#656565]">
                Starts at
              </span>
              <span className="text-lg leading-6 font-normal text-[#161616]">
                ₹{experience?.price}
              </span>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center justify-between">
              <span className="text-base leading-5 font-normal text-[#656565]">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="flex size-4 cursor-pointer items-center justify-center border-[0.4px] border-solid border-[#C9C9C9] text-[#161616] hover:bg-gray-100"
                >
                  −
                </button>

                <span className="text-xs leading-3.5 font-normal tracking-normal text-[#161616]">
                  {quantity}
                </span>

                <button
                  onClick={() => {
                    if (!selectedDate || !selectedTime) {
                      toast.error("Please select a date and time first");
                      return;
                    }

                    // find the selected slot
                    const slot = experience?.availableSlots.find(
                      (s) => s.date === selectedDate && s.time === selectedTime,
                    );

                    if (!slot) return;

                    const remaining = slot.totalSlots - slot.bookedCount;

                    // check if exceeded available slots
                    if (quantity >= remaining) {
                      toast.error(
                        `Only ${remaining} slot${remaining > 1 ? "s" : ""} available`,
                      );
                      return;
                    }

                    setQuantity((prev) => prev + 1);
                  }}
                  className="flex size-4 cursor-pointer items-center justify-center border-[0.4px] border-solid border-[#C9C9C9] text-[#161616] hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal text-[#656565]">
                Subtotal
              </span>
              <span className="text-sm leading-tight font-normal text-[#161616]">
                ₹{subtotal}
              </span>
            </div>

            {/* Taxes */}
            <div className="flex justify-between">
              <span className="text-base leading-5 font-normal text-[#656565]">
                Taxes
              </span>
              <span className="text-sm leading-tight font-normal text-[#161616]">
                ₹{tax}
              </span>
            </div>

            <hr className="my-3 border-[#D9D9D9]" />

            {/* Total */}
            <div className="flex justify-between text-xl leading-6 font-medium text-[#161616]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() =>
              navigate(`/checkout`, {
                state: {
                  experience,
                  selectedDate,
                  selectedTime,
                  quantity,
                  subtotal,
                  tax,
                  total,
                },
              })
            }
            disabled={!selectedDate || !selectedTime}
            className={`mt-4 w-full cursor-pointer rounded-md py-2 font-medium transition ${
              !selectedDate || !selectedTime
                ? "cursor-not-allowed bg-[#D7D7D7] text-[#7F7F7F]"
                : "bg-primary hover:bg-primary-dull text-[#161616]"
            }`}
          >
            Confirm
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
