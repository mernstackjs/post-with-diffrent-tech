import { Navigate, Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Profile from "./pages/Profile";
import { useAuth } from "./providers/auth-context";
import CreatePost from "./pages/create-post";
import Posts from "./pages/posts";

export default function App() {
  const { currentUser } = useAuth();
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/profile" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/create-post"
          element={currentUser ? <CreatePost /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/posts"
          element={currentUser ? <Posts /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
}
