import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../services/auth/userService";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUserProfile,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
