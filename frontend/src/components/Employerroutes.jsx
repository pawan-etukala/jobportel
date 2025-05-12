import React from 'react'
import EmployerNav from './EmployerNav'
import { Routes, Route } from 'react-router-dom'
import EmployerDashboard from './EmployerDashboard'
import ViewApplication from './ViewApplications'
import AddJob from './AddJob'
const Employerroutes = () => {
  return (
    <>
      <EmployerNav/>
      <Routes>
        <Route path="/dashboard" element={<EmployerDashboard />} />
        <Route path="/viewapplications" element={<ViewApplication/>} />
        <Route path="/addjob" element={<AddJob/>} />
      </Routes>
    </>
  )
}

export default Employerroutes
