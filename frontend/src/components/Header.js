import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white p-4 shadow-md flex justify-between items-center transition-colors duration-200">
      {/* Project Name / Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Smart Timetable Generator
      </h1>

      {/* Navigation and Theme Toggle */}
      <div className="flex items-center space-x-6">
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          {isLoggedIn && <Link to="/timetable" className="hover:underline">Timetable</Link>}
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="hover:underline">Register</Link>
              <span className="mx-2">or</span>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:underline bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          )}
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </nav>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-blue-700 dark:bg-gray-700 hover:bg-blue-800 dark:hover:bg-gray-600 transition-colors duration-200"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
