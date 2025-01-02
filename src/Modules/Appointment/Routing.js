import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppointmentList from './AppointmentList'
import Calendar from './Calendar'


const Routing = () => {
  return (
    <Routes>
        <Route path='all'element={<AppointmentList/>}></Route>
        <Route path='schedule'element={<Calendar/>}></Route>
    </Routes>
  )
}

export default Routing