import React, { useState } from "react";
import supabase from "../../utils/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return console.log(error.message);

    console.log(data);
  };
  return (
    <div>
      <div>
        <input
          className="border p-3 w-full mt-3 rounded-2xl"
          type="email"
          placeholder="ahmed@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-3 w-full mt-3 rounded-2xl"
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onSignIn}
          className="bg-blue-900 text-white px-6 py-2 mt-3 cursor-pointer rounded-md text-lg text-center "
        >
          Login
        </button>
      </div>
    </div>
  );
}
