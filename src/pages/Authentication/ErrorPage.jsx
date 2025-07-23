import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col gap-5 justify-center items-center font-bold text-4xl bg-gray-400">
      <p className="text-white"> Page Not Found 404</p>
      <p className="text-white">Go to Home Page</p>
      <button
        className="p-2 border rounded bg-red-500"
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        BACK
      </button>
    </div>
  );
};

export default ErrorPage;
