import React from 'react'
import MyApplications from './MyApplications'
import SeekerDashboard from './SeekerDashboard'
import SeekerNav from './SeekerNav'
import { Routes, Route } from 'react-router-dom'
import Job from './Jobs'

const Seekerroutes = () => {
  return (
    <div>
   <>
      <SeekerNav/>
      <Routes>
      <Route path="/dashboard" element={<SeekerDashboard />} />
        <Route path="/myapplications" element={<MyApplications />} />
        <Route path="/" element={<MyApplications />} />
        <Route path="/jobs" element={<Job />} />
      </Routes>
    </>
      
    </div>
  )
}

export default Seekerroutes
