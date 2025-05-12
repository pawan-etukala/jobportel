import React from 'react'
import { Link } from 'react-router-dom'

const EmployerNav = () => {
return (
    <div className="flex space-x-4 p-4 bg-gray-100">
        <Link
            to="/employer/viewapplications"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            View Applications
        </Link>
        <Link
            to="/employer/addjob"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
            Add Job
        </Link>
    </div>
)
}

export default EmployerNav
