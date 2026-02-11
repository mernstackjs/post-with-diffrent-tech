import { Link } from "react-router";
import { useAuth } from "../providers/auth-context";

export default function Posts() {
  const { posts, isLoading, currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-light">Loading posts...</p>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-light">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl m-auto">
      <h1 className="text-4xl font-extrabold text-center mt-6 mb-4">Posts</h1>

      <div className="grid grid-cols-3 gap-3">
        {!isLoading &&
          posts?.map((post) => (
            <Link
              to={`/post/${post.id}`}
              className="border p-4 rounded-2xl"
              key={post.id}
            >
              <h4 className="text-2xl ">{post.title}</h4>
              <p className="text-lg font-light">{post.desc}</p>
              <span className="text-sm italic font-light">
                author: {post.owner.full_name}
              </span>
              <span className="text-sm italic font-light">
                Published Time: {new Date(post.createdAt).toLocaleString()}
              </span>

              <div className="flex gap-3">
                {currentUser?.id === post.owner.id && (
                  <button className="w-full px-6 py-2 bg-green-700 text-white  rounded-2xl mt-2">
                    Edit
                  </button>
                )}
                {currentUser?.id === post.owner.id && (
                  <button className="w-full px-6 py-2 bg-red-700 text-white  rounded-2xl mt-2">
                    Delate
                  </button>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
