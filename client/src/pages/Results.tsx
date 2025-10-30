import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const refId = state?.refId || "UNDEFINED";

  return (
    <div className="mt-20 flex flex-col items-center justify-center text-center">
      <img
        src={assets.tickCircleIcon}
        alt="tick icon"
        className="mb-8 size-20"
      />
      <h1 className="text-3xl leading-10 font-medium">Booking Confirmed</h1>
      <p className="mt-2 text-sm text-[#656565]">Ref ID: {refId}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 cursor-pointer rounded bg-[#E3E3E3] px-4 py-2 text-[#656565] hover:bg-gray-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Results;
