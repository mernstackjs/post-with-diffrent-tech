import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPosts } from "../../api/posts";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
