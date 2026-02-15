import React from "react";
import { useAuth } from "../providers/auth-context";
import { useNavigate } from "react-router";
import { useCreatePost } from "../hooks/useCreatePost";

export default function CreatePost() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const handleAddPost = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title")?.toString();
    const desc = formData.get("desc")?.toString();

    createPostMutation.mutate(
      {
        title,
        desc,
        owner: {
          id: currentUser?.id,
          full_name: currentUser?.full_name,
        },
        createdAt: Date.now(),
        comments: [],
      },
      {
        onSuccess: () => {
          form.reset();
          navigate("/posts");
        },
      },
    );
  };
  return (
    <div className="max-w-2xl  m-auto p-12 ">
      <h1 className="text-2xl font-extrabold mb-4 text-center">
        Create Post Form
      </h1>
      <form onSubmit={handleAddPost}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="border w-full p-3 rounded-md"
            id="title"
            name="title"
          />
        </div>
        <div className="flex flex-col mt-2 gap-2">
          <label htmlFor="desc">Desc</label>
          <textarea
            className="border h-52 w-full p-3 rounded-md"
            id="desc"
            name="desc"
          />
        </div>
        <button
          disabled={createPostMutation.isPending}
          type="submit"
          className="w-full p-3 bg-blue-700 text-white rounded-md mt-3 font-bold text-xl"
        >
          {createPostMutation.isPending ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
