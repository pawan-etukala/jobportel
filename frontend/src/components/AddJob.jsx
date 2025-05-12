import React, { useState } from 'react';
import api from '../api';

const AddJob = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/jobs', job);
      setMessage('Job posted successfully!');
      setJob({ title: '', description: '', company: '', location: '', salary: '' });
    } catch (error) {
      console.error(error);
      setMessage('Failed to post job.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Post a New Job</h2>

      {message && (
        <div className="mb-4 text-center px-4 py-2 rounded text-white font-medium 
          transition-all duration-300 
          bg-green-500"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
