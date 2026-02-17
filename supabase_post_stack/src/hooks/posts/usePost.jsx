import { useQuery } from "@tanstack/react-query";

export const usePost = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4040/posts/${postId}`);
      if (!res.ok) return console.log("error from server");
      return res.json();
    },
    enabled: !!postId,
  });
};
