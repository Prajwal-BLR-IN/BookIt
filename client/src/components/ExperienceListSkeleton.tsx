import SkeletonCard from "./SkeletonCard";

const ExperienceListSkeleton = () => {
  // Create an array to map over for getting 8 skeleton loader
  const skeletonItems = Array(8).fill(0);

  return (
    <div className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skeletonItems.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ExperienceListSkeleton;
