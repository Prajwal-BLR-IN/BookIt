import { useNavigate } from "react-router-dom";
import type { Experience } from "../types/type";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/details/${experience._id}`);
        scrollTo(0, 0);
      }}
      className="group cursor-pointer overflow-hidden rounded-xl bg-[#F0F0F0] transition-all duration-500 hover:-translate-y-1"
    >
      <img
        src={experience.image}
        alt="experience image"
        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex h-auto w-full gap-5 px-4 py-3">
        <div className="w-full">
          <div className="flex h-6 items-center justify-between">
            <p className="text-base leading-tight font-medium">
              {experience.title}
            </p>
            <p className="flex h-6 items-center justify-center rounded-sm bg-[#D6D6D6] px-2 py-1 text-[11px] leading-4 font-medium text-[#161616]">
              {experience.location}
            </p>
          </div>
          <p className="mt-3 text-xs leading-4 font-normal text-[#6C6C6C]">
            {experience.description}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs leading-4 font-normal">From</span>
              <span className="text-xl leading-6 font-medium">
                ₹{experience.price}
              </span>
            </div>
            <button className="bg-primary hover:bg-primary-dull flex cursor-pointer items-center justify-center rounded-sm px-2 py-1.5 text-sm leading-tight font-medium transition-colors will-change-transform active:scale-95">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
