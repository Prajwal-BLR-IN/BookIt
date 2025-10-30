import ExperienceCard from "../components/ExperienceCard";
import type { Experience } from "../types/type";
import useCustomQuery from "../hooks/useQuery";

const Home = () => {
  const {
    data: experiences = [],
    isError,
    isLoading,
  } = useCustomQuery<Experience[]>("experiences", "/experiences");

  if (isLoading) return <p>Loading</p>;

  return (
    <section className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isError || !experiences || experiences?.length === 0 ? (
        <p>There is no experiences added yet</p>
      ) : (
        <>
          {experiences?.map((exp: Experience, index: number) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </>
      )}
    </section>
  );
};

export default Home;
