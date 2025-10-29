import { useEffect, useState } from "react";
import { experiences } from "../assets/assets";
import ExperienceCard from "../components/ExperienceCard";
import type { Experience } from "../types/type";

const Home = () => {
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    setExperience(experiences);
  }, []);

  return (
    <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {experience.map((exp, index) => (
        <ExperienceCard key={exp._id} experience={exp} />
      ))}
    </section>
  );
};

export default Home;
