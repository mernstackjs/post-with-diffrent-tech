import { Link } from "react-router";
import axios from "axios";
import { useAuth } from "../providers/auth-context";

export default function SignUp() {
  const { users, isLoading, getUsers, error } = useAuth();

  console.log(error);

  console.log(users);
  console.log(isLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const full_name = formData.get("full_name");

    if (!email && !password) return alert("Enter credential");
    const isExit = !isLoading && users.find((u) => u.email == email);

    if (isExit) return alert("already you are registered login");

    try {
      const res = await axios.post("http://localhost:6060/users", {
        email,
        password,
        full_name,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    await getUsers();
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="full_name">Full Name :</label>
          <input
            className="border rounded-md p-3 w-full"
            id="full_name"
            name="full_name"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <span className="text-sm font-light italic mt-2">
        Already have an account ?
        <Link className="text-red-400 underline" to={"/sign-in"}>
          Login in here
        </Link>
      </span>
    </div>
  );
}
