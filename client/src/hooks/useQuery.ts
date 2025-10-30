import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axios";

const fetchExperiences = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

const useCustomQuery = <T>(queryKey: string, url: string) => {
  const { data, isError, isLoading, error } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        return await fetchExperiences(url);
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch data");
        throw err;
      }
    },
  });

  return { data, isError, isLoading, error };
};

export default useCustomQuery;
