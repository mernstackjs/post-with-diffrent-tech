import { useState } from "react";
import { useAuth } from "../providers/auth-context";
import { usePosts } from "../hooks/usePosts";

export default function Profile() {
  const { currentUser } = useAuth();
  const { data: posts, isPending, error, isError } = usePosts();

  const yourPosts = posts.filter((pos) => pos.owner.id === currentUser?.id);
  console.log(yourPosts);
  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Welcome, {currentUser.full_name}!
        </h1>

        <p className="text-gray-600 mb-6">
          You have <span className="font-semibold">{yourPosts.length}</span>{" "}
          {yourPosts.length === 1 ? "post" : "posts"}.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Info
          </h2>
          <ul className="text-gray-600 space-y-1">
            <li>
              <span className="font-medium">ID:</span> {currentUser.id}
            </li>
            <li>
              <span className="font-medium">Email:</span> {currentUser.email}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Posts
          </h2>
          {yourPosts.length ? (
            <ul className="space-y-3">
              {yourPosts.map((post) => (
                <li
                  key={post.id}
                  className="border p-4 rounded-xl hover:shadow-lg transition-shadow bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.desc}</p>
                  <span className="text-gray-500 text-xs">
                    Published: {new Date(post.createdAt).toLocaleString()}
                  </span>
                  <div className="w-full mt-4">
                    <h3 className="text-gray-700 font-semibold mb-2">
                      Comments ({post.comments.length})
                    </h3>

                    <ul className="space-y-3">
                      {post.comments.map((c) => (
                        <li
                          key={c.id}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800">
                              {c.user}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(c.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{c.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              You haven't created any posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
