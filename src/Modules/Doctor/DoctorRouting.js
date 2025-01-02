import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DoctorList from './DoctorList'
import ViewAvailabity from './ViewAvailabity'

const DoctorRouting = () => {
  return (
    <Routes>
    <Route path='all'element={<DoctorList/>}></Route>
    <Route path='availability'element={<ViewAvailabity/>}></Route>
</Routes>
  )
}

export default DoctorRouting