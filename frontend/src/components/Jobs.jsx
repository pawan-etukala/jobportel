import React, { useEffect, useState } from 'react';
import api from '../api';

const jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/api/jobs');
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    setSelectedJob(jobId);
    setShowModal(true);  // Show modal when apply is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close modal
    setResume(null);  // Clear the selected file
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setError('');  // Clear error on valid file
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleSubmitApplication = async () => {
    if (!resume) {
      setError('Please upload a resume.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await api.post(`/api/applications/${selectedJob}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);  // Close the modal after successful submission
      setError('');  // Clear error
      alert('Application submitted successfully!');
    } catch (err) {
      setError('Failed to submit application');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Job Openings</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {jobs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md border p-6 rounded-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 text-blue-700">{job.title}</h2>
                <p className="text-gray-800 font-medium mb-1">Company: {job.company}</p>
                <p className="text-gray-700 mb-1">Location: {job.location}</p>
                <p className="text-gray-600 mb-3">{job.description}</p>
                <p className="text-sm text-gray-400">
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleApply(job._id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No job postings found.</p>
      )}

      {/* Modal for file upload */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Upload Resume</h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={handleSubmitApplication}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default jobs;
