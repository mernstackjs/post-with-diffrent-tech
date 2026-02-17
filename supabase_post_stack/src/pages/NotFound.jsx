import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-3xl font-extrabold ">NotFound</h1>
      <button
        className="bg-blue-950 text-white flex gap-3 pl-2 pr-8 cursor-pointer rounded-2xl py-1"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        Back
      </button>
    </div>
  );
}
