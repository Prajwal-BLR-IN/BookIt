import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const refId = state?.refId || "UNDEFINED";

  return (
    <div className="mt-20 flex flex-col items-center justify-center text-center">
      <motion.img
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        src={assets.tickCircleIcon}
        alt="tick icon"
        className="mb-8 size-20"
      />
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl leading-10 font-medium"
      >
        Booking Confirmed
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-2 text-sm text-[#656565]"
      >
        Ref ID: {refId}
      </motion.p>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onClick={() => navigate("/")}
        className="mt-8 cursor-pointer rounded bg-[#E3E3E3] px-4 py-2 text-[#656565] hover:bg-gray-300"
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default Results;
