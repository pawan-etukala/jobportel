import React from "react";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const EmployerDashboard = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-gray-500">Loading...</p>
      </div>
    ); // Show loading state while fetching user details
  }

  return (
    <div className=" text-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">Employer Dashboard</h2>

        {user ? (
          <div className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">User Details</h3>
              <p className="text-gray-600 text-lg"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-600 text-lg"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 text-lg"><strong>Role:</strong> {user.role}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => alert('Edit profile feature coming soon!')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">User not found or not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
