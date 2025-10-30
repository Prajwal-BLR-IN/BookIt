import ExperienceCard from "../components/ExperienceCard";
import type { Experience } from "../types/type";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

const fetchExperiences = async () => {
  try {
    const res = await api.get("/experiences");
    return res.data;
  } catch (error: any) {
    console.log("Error fetching experiences", error.message);
    toast.error(error.message);
  }
};

const Home = () => {
  const { data: experiences = [], isError } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperiences,
  });

  return (
    <section className="my-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isError || !experiences || experiences.length === 0 ? (
        <p>Loading</p>
      ) : (
        <>
          {experiences.map((exp: Experience, index: number) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </>
      )}
    </section>
  );
};

export default Home;
