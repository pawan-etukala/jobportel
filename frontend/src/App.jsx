import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import EmployerDashboard from "./components/EmployerDashboard";
import SeekerDashboard from "./components/SeekerDashboard";
// import Logout from "./components/Logout";
import Home from "./components/Jobs";
import Navbar from "./components/Navbar";
import Seekerroutes from "./components/Seekerroutes";
import Employerroutes from "./components/Employerroutes";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import LandingPage from "./components/Landing";
//import { AuthProvider } from "./context/AuthContext"; 
function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<LandingPage />} />
        {/* Protect employer routes */}
        <Route
          path="/employer/*"
          element={
            <ProtectedRoute
              roles={['employer']} // Only allow employer role
              component={Employerroutes}
            />
          }
        />

        <Route path="/seeker/*" element={<Seekerroutes />} />
        {/* <Route path="/logout" element={<Logout />} /> */}
       
      </Routes>
     

    </>
  );
}

export default App;
