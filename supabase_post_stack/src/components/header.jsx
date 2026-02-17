import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-12 py-3">
      <h3>PostData</h3>

      <nav className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
      </nav>

      <Link
        className="bg-slate-950 text-white  px-5 py-2 rounded-2xl"
        to="/get-start"
      >
        Get Start
      </Link>
    </header>
  );
}
