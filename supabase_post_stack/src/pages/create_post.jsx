import { useNavigate } from "react-router";
import { useCreatePost } from "../hooks/posts/useCreatePost";

export default function CreatePost() {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const desc = formData.get("desc");

    if (!title || !desc) return alert("!!!Opppps fill all fields");
    console.log(title, desc);

    createPostMutation.mutate(
      {
        title,
        desc,
        createdAt: new Date(),
      },
      {
        onSuccess: () => {
          e.target.reset();
          navigate("/");
        },
      },
    );
  };

  return (
    <div>
      <div className="max-w-lg m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center my-3">
            Add Post Form
          </h1>

          <div className="my-3">
            <label htmlFor="title">Title</label>
            <input
              placeholder="Type Your Title ......."
              className="border mt-2 w-full px-5 py-2 rounded-2xl"
              type="text"
              id="title"
              name="title"
            />
          </div>
          <div className="my-3">
            <label htmlFor="desc">Desc</label>
            <textarea
              placeholder="Type Your Desc ......."
              className="border h-52 mt-2 w-full px-5 py-2 rounded-2xl"
              type="text"
              id="desc"
              name="desc"
            />
          </div>
          <button className="bg-blue-700 text-white px-5 py-3 rounded-2xl w-full cursor-pointer font-semibold text-xl hover:bg-blue-500">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}
