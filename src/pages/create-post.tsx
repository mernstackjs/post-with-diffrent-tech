import React from "react";
import { useAuth } from "../providers/auth-context";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const { currentUser, getPosts } = useAuth();
  const navigate = useNavigate();
  const handleAddPost = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString();
    const desc = formData.get("desc")?.toString();

    try {
      const res = await axios.post("http://localhost:6060/posts", {
        title,
        desc,
        owner: {
          id: currentUser?.id,
          full_name: currentUser?.full_name,
        },
        createdAt: Date.now(),
        comments: [],
      });
      await getPosts();
      if (res.data) return navigate("/posts");
    } catch (error) {
      console.log(error);
    }

    e.currentTarget.reset();
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
          type="submit"
          className="w-full p-3 bg-blue-700 text-white rounded-md mt-3 font-bold text-xl"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
