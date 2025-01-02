import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PatientList from './PatientList'

const PatientRouting = () => {
  return (
    <Routes>
    <Route path='all'element={<PatientList/>}></Route>
</Routes>
  )
}

export default PatientRouting