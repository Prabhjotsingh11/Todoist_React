import { useNavigate } from "react-router-dom";

const AboutApp = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login"); // Navigate to login page when "Start" button is clicked
  };
  return (
    <>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center space-y-8 p-8 bg-white bg-opacity-70 rounded-lg shadow-lg max-w-lg">
          {/* Welcome text */}
          <h1 className="text-4xl font-bold text-teal-800">Welcome</h1>
          <p className="text-xl text-gray-700">
            Let's start your Todoist journey today!
          </p>

          
          <button
            onClick={handleStartClick}
            className="mt-6 px-6 py-3 bg-teal-500 text-white font-semibold text-lg rounded-md shadow hover:bg-teal-600 transition-all duration-200"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
};
export default AboutApp;
