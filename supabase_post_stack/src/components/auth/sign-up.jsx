import React, { useState } from "react";
import supabase from "../../utils/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateAccount = async () => {
    if (!email || !fullName || !password) {
      return alert("Please fill all fields!");
    }

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("authData", authData);
    if (authError) {
      console.log(authError);
      setLoading(false);
      return alert(authError.message);
    }

    const userId = authData.user.id; // Supabase user ID

    // 2️⃣ Insert profile in 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert([{ user_id: userId, full_name: fullName }]);

    setLoading(false);

    console.log("profileData", profileData);

    if (profileError) {
      console.log(profileError);
      return alert("Profile creation failed: " + profileError.message);
    }

    alert("Account created successfully! Check your email to confirm.");
    setEmail("");
    setFullName("");
    setPassword("");
  };

  return (
    <div>
      <div>
        <input
          className="border p-3 w-full mt-3 rounded-2xl"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          onClick={onCreateAccount}
          className="bg-blue-900 text-white px-6 py-2 mt-3 cursor-pointer rounded-md text-lg text-center "
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
