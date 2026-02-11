import { Link } from "react-router";

export default function Header() {
  return (
    <div className="flex justify-between border-b border-gray-100  items-center px-12 py-5">
      <h1>Header</h1>
      <nav className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </nav>
    </div>
  );
}
