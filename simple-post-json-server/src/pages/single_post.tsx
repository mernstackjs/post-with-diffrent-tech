import { useParams } from "react-router";
import { useAuth } from "../providers/auth-context";
import { useState } from "react";
import axios from "axios";

import { usePost } from "../hooks/usePost";

export default function PostDetails() {
  const { postId } = useParams();
  const { currentUser, getPosts } = useAuth();
  const { data: postData, isPending, isError, error } = usePost(postId!);

  const post = !isPending && postData.find((p) => p.id === postId);
  const [commentText, setCommentText] = useState("");

  if (isPending) return <p>Loading post...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  if (!post) return <p>Post not found</p>;

  const addComment = async () => {
    if (!commentText) return;

    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      createdAt: Date.now(),
      user: currentUser?.full_name,
    };

    try {
      const updatedComment = [...post?.comments, newComment];
      const res = await axios.put(`http://localhost:6060/posts/${post.id}`, {
        ...post,
        comments: updatedComment,
      });

      setCommentText("");
      getPosts();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-3xl mt-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{post?.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{post?.desc}</p>
        <span className="text-sm italic text-gray-500">
          Published: {new Date(post?.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Add a Comment
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            onChange={(e) => setCommentText(e.target.value)}
            type="text"
            placeholder="Write your comment..."
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addComment}
            className="px-6 py-2 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
