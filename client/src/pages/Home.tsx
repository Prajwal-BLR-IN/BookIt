import ExperienceCard from "../components/ExperienceCard";
import type { Experience } from "../types/type";
import useCustomQuery from "../hooks/useQuery";
import { useSearchStore } from "../store/searchStore";
import { assets } from "../assets/assets";
import ExperienceListSkeleton from "../components/ExperienceListSkeleton";
import { motion } from "motion/react";

const Home = () => {
  const { searchTerm, clearSearch } = useSearchStore();

  const {
    data: experiences = [],
    isError,
    isLoading,
  } = useCustomQuery<Experience[]>("experiences", "/experiences");

  if (isLoading) return <ExperienceListSkeleton />;
  if (isError) return <p>Something went wrong</p>;

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <section className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredExperiences.length === 0 ? (
        <div className="col-span-6 m-auto mt-20 flex flex-col items-center justify-center text-center">
          <img
            src={assets.warningIcon}
            alt="tick icon"
            className="mb-8 size-20"
          />
          <h1 className="text-3xl leading-10 font-medium">
            No experiences found
          </h1>
          <button
            onClick={clearSearch}
            className="mt-8 cursor-pointer rounded bg-[#E3E3E3] px-4 py-2 text-[#656565] hover:bg-gray-300"
          >
            Clear search
          </button>
        </div>
      ) : (
        filteredExperiences.map((exp, index) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: Math.min(0.1 * index, 1),
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            key={exp._id}
          >
            <ExperienceCard experience={exp} />
          </motion.div>
        ))
      )}
    </section>
  );
};

export default Home;
