import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
