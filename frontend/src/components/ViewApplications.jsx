import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock } from 'lucide-react'; // Optional: install lucide-react

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/api/applications/');
        setApplications(res.data);

        const initialStatus = {};
        res.data.forEach(app => {
          initialStatus[app._id] = app.status;
        });
        setStatusUpdates(initialStatus);
      } catch (err) {
        setMessage('❌ Failed to load applications');
      }
    };

    fetchApplications();
  }, []);

  const handleSelectChange = (id, newStatus) => {
    setStatusUpdates(prev => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleStatusSave = async (id) => {
    const updatedStatus = statusUpdates[id];

    try {
      await api.put(`/api/applications/application/${id}/status`, {
        status: updatedStatus,
      });

      setApplications(prev =>
        prev.map(app =>
          app._id === id ? { ...app, status: updatedStatus } : app
        )
      );

      setMessage('✅ Status updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update status');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const commonClasses = "flex items-center gap-1 px-3 py-1 text-sm text-white rounded-full";

    switch (status) {
      case 'Accepted':
        return <span className={`bg-green-600 ${commonClasses}`}><CheckCircle size={16} /> Accepted</span>;
      case 'Rejected':
        return <span className={`bg-red-600 ${commonClasses}`}><XCircle size={16} /> Rejected</span>;
      default:
        return <span className={`bg-yellow-500 ${commonClasses}`}><Clock size={16} /> Pending</span>;
    }
  };

  if (!applications.length) {
    return <div className="text-center mt-10 text-gray-600 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">View Applications</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {applications.map(application => (
          <div
            key={application._id}
            className="relative border rounded-lg p-6 bg-white shadow hover:shadow-lg transition duration-300"
          >
            <div className="absolute top-3 right-3">
              {getStatusBadge(statusUpdates[application._id])}
            </div>

            <div className="space-y-1">
              <p><span className="font-semibold">Job:</span> {application.job?.title || 'N/A'}</p>
              <p><span className="font-semibold">Company:</span> {application.job?.company || 'N/A'}</p>
              <p><span className="font-semibold">Applicant:</span> {application.applicant?.name || 'N/A'}</p>
              <p><span className="font-semibold">Email:</span> {application.applicant?.email || 'N/A'}</p>
              <p><span className="font-semibold">Resume:</span> <a href={application.resume} className="text-blue-600 underline" target="_blank" rel="noreferrer">View</a></p>
            </div>

            <div className="mt-4">
              <label className="block font-medium text-gray-700 mb-2">Update Status</label>
              <select
                value={statusUpdates[application._id]}
                onChange={(e) => handleSelectChange(application._id, e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={() => handleStatusSave(application._id)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Save Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className="mt-6 text-center text-lg font-semibold animate-pulse text-green-600">
          {message}
        </div>
      )}
    </div>
  );
};

export default ViewApplication;
