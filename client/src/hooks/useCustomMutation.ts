import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axios";

// Type for hook parameters
interface UseCustomMutationParams {
  url: string;
  onSuccessRedirect?: () => void;
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
  onSuccessRedirect,
  invalidateKey,
  invalidateKey2,
}: UseCustomMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, any, PayloadData>({
    mutationFn: async (payload) => {
      const { data } = await api.post(url, payload);
      return data;
    },

    onSuccess: async () => {
      // Invalidate queries if needed
      if (invalidateKey)
        await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      if (invalidateKey2)
        await queryClient.invalidateQueries({ queryKey: [invalidateKey2] });

      // Redirect if provided
      if (onSuccessRedirect) onSuccessRedirect();
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
