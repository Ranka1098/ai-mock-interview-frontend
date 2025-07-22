import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success("logout successfully");
    navigate("/login");
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/profile", {
        withCredentials: true,
      });

      console.log("User data:", res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data);
      toast.error("Session expired or not authorized");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
