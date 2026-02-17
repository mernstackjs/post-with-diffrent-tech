import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../api/posts";

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPost,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["posts", variables.postId], data);

      queryClient.invalidateQueries(["posts"]);
    },
  });
};
