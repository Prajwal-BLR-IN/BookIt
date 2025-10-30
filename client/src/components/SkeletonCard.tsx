// SkeletonCard.jsx
const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-gray-100">
      {/* 1. Image Placeholder */}
      <div className="h-48 w-full animate-pulse bg-gray-300"></div>

      {/* 2. Content Area */}
      <div className="p-5">
        {/* 3. Title & Tag Placeholder */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300"></div>
          <div className="h-5 w-1/4 animate-pulse rounded-full bg-gray-300"></div>
        </div>

        {/* 4. Description Placeholder */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
        </div>

        {/* 5. Footer (Price & Button) Placeholder */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-300"></div>
          <div className="h-10 w-2/5 animate-pulse rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
