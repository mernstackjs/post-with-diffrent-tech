export async function fetchPosts() {
  const res = await fetch("http://localhost:6060/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function createPost(newPost) {
  const res = await fetch("http://localhost:6060/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}
