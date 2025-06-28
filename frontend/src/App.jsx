import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";

// Creating global context to share user data
export const UserContext = createContext();

function App() {
  const currentYear = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Retrieve user data from localStorage on load
  const getUserData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {userLoggedIn && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/courseSection/:courseId/:courseTitle"
                  element={<CourseContent />}
                />
              </>
            )}
          </Routes>
        </div>

        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">
            © {currentYear} Copyright: Study App
          </div>
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
