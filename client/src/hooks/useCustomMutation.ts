import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Type for hook parameters
interface UseCustomMutationParams {
  url: string;
  invalidateKey?: string;
  invalidateKey2?: string;
}

// Type for response & payload
interface ApiResponse {
  success: boolean;
  message?: string;
  [key: string]: any;
}

type PayloadData = Record<string, any>;

// Custom mutation hook
export const useCustomMutation = ({
  url,
  invalidateKey,
  invalidateKey2,
}: UseCustomMutationParams) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse, any, PayloadData>({
    mutationFn: async (payload) => {
      const { data } = await api.post(url, payload);
      return data;
    },

    onSuccess: async (data: ApiResponse) => {
      console.log("onSuccess fired with data:", data);

      // Invalidate queries if needed
      if (invalidateKey)
        await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      if (invalidateKey2)
        await queryClient.invalidateQueries({ queryKey: [invalidateKey2] });

      if (data.success) {
        navigate("/confirmation", { state: { refId: data.bookingRef } });
      }
    },

    onError: (error: any) => {
      const backendMessage =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(backendMessage);
    },
  });
};
