import React, { useEffect, useState } from 'react';
import api from '../api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/api/applications/my');
        setApplications(res.data);
      } catch (err) {
        setMessage('Failed to load applications.');
      }
    };

    fetchApplications();
  }, []);

  const openModal = (resumePath) => {
    setSelectedResume(resumePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResume(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Applications</h2>

      {message && (
        <p className="text-center text-red-600 bg-red-100 p-3 rounded-md mb-4">{message}</p>
      )}

      {applications.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No applications found.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {app.job?.title || 'N/A'}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Company:</span> {app.job?.company || 'N/A'}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Location:</span> {app.job?.location || 'N/A'}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 text-sm rounded-md ${
                    app.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : app.status === 'Accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {app.status}
                </span>
              </p>
              <button
                onClick={() => openModal(app.resume)}
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                View Resume
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Resume Preview</h3>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="border rounded overflow-hidden h-[500px]">
              <iframe
                src={`http://localhost:5000/${selectedResume}`}
                title="Resume"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
