const ExperienceDetailSkeleton = () => {
  return (
    <div className="mx-auto my-10 max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        {/* === Left Column (Content) === */}
        <div className="space-y-8 lg:col-span-2">
          {/* 1. Image Placeholder */}
          <div className="h-64 w-full animate-pulse rounded-xl bg-gray-300 md:h-96"></div>

          {/* 2. Title Placeholder */}
          <div className="h-9 w-3/5 animate-pulse rounded-lg bg-gray-300"></div>

          {/* 3. Description Placeholder */}
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
          </div>

          {/* 4. Date Picker Placeholder */}
          <div className="space-y-4">
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-300"></div>
            <div className="flex gap-3">
              <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-300"></div>
              <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </div>

          {/* 5. About Section Placeholder */}
          <div className="space-y-3">
            <div className="h-6 w-1/5 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>

        {/* === Right Column (Booking Card) === */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl bg-gray-100 p-6">
            <div className="space-y-4">
              {/* Price lines */}
              <div className="flex justify-between">
                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-300"></div>
                <div className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-300"></div>
                <div className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-300"></div>
                <div className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-300"></div>
                <div className="h-5 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-gray-300"></div>

              {/* Total line */}
              <div className="flex justify-between">
                <div className="h-7 w-1/3 animate-pulse rounded bg-gray-300"></div>
                <div className="h-7 w-1/4 animate-pulse rounded bg-gray-300"></div>
              </div>

              {/* Button */}
              <div className="mt-6 h-12 w-full animate-pulse rounded-lg bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailSkeleton;
