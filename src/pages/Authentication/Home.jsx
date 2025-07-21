import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success("logout successfully");
    navigate("/login");
  };

  return (
    <div className="flex justify-between">
      Home
      <div className="flex justify-end">
        <button className="bg-red-600 p-1 rounded-md " onClick={handleLogOut}>
          logOut
        </button>
      </div>
    </div>
  );
};

export default Home;
