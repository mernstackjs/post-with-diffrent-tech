import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePost } from "../hooks/posts/usePost";
import { useDeletePost } from "../hooks/posts/useDeletePost";

import { useEditPost } from "../hooks/posts/useEditPost";

export default function PostDetails() {
  const { postId } = useParams();

  const { data: post, isPending, isError, error } = usePost(postId);
  const { mutate: editMutate, isPending: editPending } = useEditPost();

  const [title, setTitle] = useState(() => post?.title || "");
  const [desc, setDesc] = useState(() => post?.desc || "");
  const [editMode, setEditMode] = useState(false);

  const onHandleSave = async (e) => {
    e.preventDefault();

    editMutate(
      {
        postId,
        title,
        desc,
      },
      {
        onSuccess: () => {
          setEditMode(false);
        },
      },
    );

    setEditMode(false);
  };

  const navigate = useNavigate();
  const { mutate, isPending: deleteIsPending } = useDeletePost();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const handleOnDelte = async (id) => {
    mutate(id, { onSuccess: () => navigate("/") });
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="px-8 py-1 rounded-2xl cursor-pointer bg-slate-900 text-white"
      >
        Back
      </button>

      <div className="max-w-2xl p-8 m-auto ">
        {!editMode ? (
          <div className="shadow-lg border border-gray-100 p-8" key={post.id}>
            <h4 className="text-3xl font-bold mb-2">{post.title}</h4>
            <p>{post.desc}</p>

            <div className="flex gap-3 ">
              <button
                disabled={deleteIsPending}
                className="px-5 py-2 bg-red-600 text-white rounded-2xl mt-4"
                onClick={() => handleOnDelte(post.id)}
              >
                {!deleteIsPending ? "Delete" : "Deleting ..."}
              </button>

              <button
                onClick={() => setEditMode(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-2xl mt-4"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onHandleSave} className="border p-8 rounded-2xl mb-4">
            <h1 className="text-2xl font-semibold ">Edit Form</h1>

            <div className="my-3">
              <label htmlFor="title">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type Your Title ......."
                className="border mt-2 w-full px-5 py-2 rounded-2xl"
                type="text"
                id="title"
              />
            </div>
            <div className="my-3">
              <label htmlFor="desc">Desc</label>
              <textarea
                placeholder="Type Your Desc ......."
                className="border h-52 mt-2 w-full px-5 py-2 rounded-2xl"
                type="text"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button
              disabled={editPending}
              className="bg-blue-700 text-white px-5 py-3 rounded-2xl w-full cursor-pointer font-semibold text-xl hover:bg-blue-500"
            >
              {editMode ? "Save Post" : "Saving Post"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
