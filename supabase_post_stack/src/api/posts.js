// fetch all posts
export const fetchPosts = async () => {
  const res = await fetch("http://localhost:4040/posts");
  if (!res.ok) return console.log("error from server");

  return res.json();
};
// add a new post
export const createPosts = async (newPost) => {
  const res = await fetch("http://localhost:4040/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) return console.log("error from server");

  return res.json();
};

//   delete post
export const deletePost = async (postId) => {
  const res = await fetch(`http://localhost:4040/posts/${postId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return true;
};

//   edit post
export const editPost = async ({ postId, title, desc }) => {
  const res = await fetch(`http://localhost:4040/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      desc,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
};
