import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Summery() {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [new_title, setNewTitle] = useState("");
  const [new_desc, setNewDesc] = useState("");
  const [selectedId, setSelectedId] = useState();
  const queryClient = useQueryClient();

  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4040/posts");
      if (!res.ok) throw new Error();
      return res.json();
    },
  });

  const {
    data: post,
    isPending: singlePostPending,
    isError: singlePostIsError,
    error: singlePostError,
  } = useQuery({
    queryKey: ["summary", selectedId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4040/posts/${selectedId}`);
      if (!res.ok) throw new Error();
      return res.json();
    },

    enabled: !!selectedId,
  });

  const { mutate } = useMutation({
    mutationFn: async ({ title, desc }) => {
      const res = await fetch(`http://localhost:4040/posts/${selectedId}`, {
        method: "put",
        body: JSON.stringify({
          title,
          desc,
        }),
      });
      if (!res.ok) throw new Error();

      res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["summary"]);
    },

    enabled: !!selectedId,
  });
  const { mutate: deleteMutation } = useMutation({
    mutationFn: async (postId) => {
      const res = await fetch(`http://localhost:4040/posts/${postId}`, {
        method: "delete",
      });
      if (!res.ok) throw new Error();

      res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["summary"]);
    },

    enabled: !!selectedId,
  });

  const onEdit = (post) => {
    if (!post) return;
    setEditMode(true);

    setTitle(post.title);
    setDesc(post.desc);
    setSelectedId(post.id);
  };

  const onSave = async () => {
    if (!selectedId) return;
    mutate({ title, desc });
  };

  const { mutate: addMutation } = useMutation({
    mutationFn: async (newData) => {
      const res = await fetch("http://localhost:4040/posts", {
        method: "post",
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error();

      res.json();
      queryClient.invalidateQueries(["summary"]);
    },
  });

  const addNewPost = async () => {
    if (!new_title || !new_desc) return alert("!!!! OOOPPPS");
    console.log(title, desc);

    // const newPost = { new_title, new_desc };
    const newPost = { title: new_title, desc: new_desc };

    console.log(new_title, new_desc);

    addMutation(newPost);

    setNewTitle("");
    setNewDesc("");
  };
  if (isPending)
    return (
      <div>
        <h1>....... Loading</h1>
      </div>
    );
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      Summery
      <div className="max-w-2xl m-auto border p-4">
        <h1>Add New Post</h1>
        <div className="flex flex-col gap-1">
          <input
            value={new_title}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-3 mb-3"
            type="text"
            placeholder="title"
          />
          <input
            value={new_desc}
            onChange={(e) => setNewDesc(e.target.value)}
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
      {editMode && (
        <div>
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
          <button onClick={onSave} className="bg-blue-800 text-white  p-3 mb-3">
            Save{" "}
          </button>
        </div>
      )}
      <div>
        <h1>Single Posts</h1>
        {singlePostPending && !post ? (
          <h4 className="italic text-center text-lg font-extralight text-red-500">
            To see post here choose one of post bellow{" "}
          </h4>
        ) : (
          <ul>
            <li className="border p-4 ">
              <p>{post.title}</p>
              <p>{post.desc}</p>
            </li>
          </ul>
        )}
      </div>
      <div className="border p-3 mt-6">
        <h1>Posts Lists</h1>

        {posts?.map((post) => (
          <ul key={post.id} className="border p-2 my-3">
            <li>
              <p>{post.title}</p>
              <button
                onClick={() => onEdit(post)}
                className="bg-blue-800 text-white p-3 rounded-2xl mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation(post.id)}
                className="bg-red-800 text-white p-3 rounded-2xl mr-3"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedId(post.id)}
                className="bg-slate-800 text-white mt-3  px-5 py-2 rounded-lg"
              >
                choose post
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
