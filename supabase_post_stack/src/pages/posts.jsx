import { Link } from "react-router";
import { usePosts } from "../hooks/posts/usePosts";

export default function Posts() {
  const { data: posts, isPending, isError, error } = usePosts();
  if (isPending) return <div>...... Loading</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      <h1>
        List Of All Posts{" "}
        <span className="font-extrabold ml-2">({posts?.length})</span>
      </h1>

      <div className="grid grid-cols-3 gap-3 my-4">
        {posts?.map((post) => (
          <div className="border rounded-2xl p-5" key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.desc}</p>
            <Link
              className="underline italic text-red-400"
              to={`/post/${post.id}`}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
