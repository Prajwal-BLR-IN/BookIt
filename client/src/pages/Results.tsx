import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const refId = state?.refId || "UNDEFINED";

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      <div className="mb-3 text-4xl">✅</div>
      <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
      <p className="mt-2 text-sm text-gray-600">Ref ID: {refId}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Results;
