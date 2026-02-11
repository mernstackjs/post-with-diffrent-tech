import { Link } from "react-router";
import { useAuth } from "../providers/auth-context";

export default function Header() {
  const { currentUser, logOut } = useAuth();

  return (
    <div className="flex justify-between border-b border-gray-100  items-center px-12 py-5">
      <h1>Header</h1>
      {currentUser ? (
        <nav className="flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create-post">Create Post</Link>
        </nav>
      ) : (
        <nav className="flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </nav>
      )}

      {currentUser && (
        <button
          onClick={() => logOut()}
          className="text-white bg-red-700 hover:bg-red-500 px-5 cursor-pointer font-bold text-lg py-2 rounded-md"
        >
          Logout
        </button>
      )}
    </div>
  );
}
