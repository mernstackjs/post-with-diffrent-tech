import React, { useState } from "react";
import SignIn from "../components/auth/sign-in";
import SignUp from "../components/auth/sign-up";

export default function GetStart() {
  const [tab, setTab] = useState("sign-in");
  return (
    <div className="max-w-lg m-auto mt-12 border p-5 rounded-2xl">
      <h1 className="font-semibold text-2xl text-center mb-2"> Auth Form</h1>

      <div className="flex gap-3">
        <button
          onClick={() => setTab("sign-in")}
          className="w-full bg-blue-900 text-white px-3 py-2 rounded-2xl  cursor-pointer"
        >
          Sign In
        </button>
        <button
          onClick={() => setTab("sign-up")}
          className="w-full bg-blue-800 text-white px-3 py-2 rounded-2xl  cursor-pointer"
        >
          Sign Up
        </button>
      </div>
      {tab === "sign-in" ? <SignIn /> : <SignUp />}
    </div>
  );
}
