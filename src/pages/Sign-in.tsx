import { Link } from "react-router";
import { useAuth } from "../providers/auth-context";

export default function SignIn() {
  const { signIn } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!email || !password) return alert("enter credintial");
    const user = {
      email,
      password,
    };
    signIn(email, password);
    console.log(user);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="email">Email :</label>
          <input
            className="border rounded-md p-3 w-full"
            id="email"
            name="email"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password">Password :</label>
          <input
            className="border p-3 rounded-md w-full"
            id="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white p-3 rounded-md w-full text-2xl cursor-pointer"
        >
          Login
        </button>
      </form>
      <span className="text-sm font-light italic mt-2">
        Don't have account ?{" "}
        <Link className="text-red-400 underline" to={"/sign-up"}>
          create account here
        </Link>
      </span>
    </div>
  );
}
