import { Route, Routes } from "react-router";
import Header from "./components/header";

import NotFound from "./pages/NotFound";
import Home from "./screens/home";
import Posts from "./screens/posts";
import GetStart from "./screens/get-start";
export default function App() {
  return (
    <div>
      <Header />
      <main className="px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/get-start" element={<GetStart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
