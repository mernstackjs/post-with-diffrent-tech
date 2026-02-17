import { useState } from "react";
import supabase from "../utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const { data: posts, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) throw new Error();
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .insert({ title, desc });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      setTitle("");
      setDesc("");
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const addNewPost = async () => {
    if (!title || !desc) return alert("!!!! OOOPS");
    mutate(title, desc);
  };

  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId) => {
      await supabase.from("posts").delete().eq("id", postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2 ">
        {!isPending &&
          posts?.map((post) => (
            <div className="border my-3 p-3 rounded-2xl" key={post.id}>
              <p>{post.title}</p>
              <p>{post.desc}</p>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-700 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      <div className="col-span-1  border p-4">
        <h1>Add New Post</h1>
        <div className="flex flex-col gap-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 mb-3"
            type="text"
            placeholder="title"
          />
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-3 mb-3"
            type="text"
            placeholder="desc"
          />
          <button
            onClick={addNewPost}
            className="bg-blue-800 text-white  p-3 mb-3"
          >
            Add New Post
          </button>
        </div>
      </div>
    </div>
  );
}
