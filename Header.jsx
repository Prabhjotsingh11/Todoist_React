import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Features/userslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const validToken = useSelector((state) => state.user.validToken);
  const username = useSelector((state) => state.user.username);

  const navigate = useNavigate();

  const clearToken = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-amber-100 dark:bg-gray-800 shadow-md">
      <div className="flex flex-col">
        <div className="text-2xl font-bold text-teal-800 dark:text-amber-100">
          Todoist
        </div>
        {username && (
          <div className="text-md text-teal-700 dark:text-amber-200">
            Welcome, <span className="font-semibold">{username}</span>!
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {validToken ? (
          <button
            onClick={clearToken}
            className="px-4 py-2 bg-red-500 text-black font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-500 text-black font-semibold rounded-lg hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
