import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, experiences } from "../assets/assets";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = experiences.find((exp) => exp._id === id);

  // Local states for slot selection
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!experience) return <p>Experience not found</p>;

  // Get all unique dates
  const uniqueDates = Array.from(
    new Set(experience.availableSlots.map((slot) => slot.date)),
  );

  // Filter slots for selected date
  const filteredSlots = selectedDate
    ? experience.availableSlots.filter((slot) => slot.date === selectedDate)
    : [];

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
        <div className="lg:col-span-2">
          <img
            src={experience?.image}
            alt="experience image"
            className="mb-4 h-auto w-full rounded-xl object-cover md:max-h-100"
          />
          {/* Description */}
          <div className="mt-8">
            <h2 className="text-2xl leading-8 font-medium">
              {experience?.title}
            </h2>
            <p className="text-gray-500">{experience?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
