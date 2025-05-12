import React from 'react'
import { Link } from 'react-router-dom'
const SeekerNav = () => {
  return (
    <div>
      <div className="flex space-x-4 p-4 bg-gray-100">
        <Link
            to="/seeker/myapplications"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
           My applications
        </Link>
        <Link
            to="/seeker/jobs"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
             Jobs
        </Link>
    </div>
    </div>
  )
}

export default SeekerNav
