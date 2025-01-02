import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SpecialityList from './SpecialityList'

const SpecialityRouting = () => {
  return (
    <Routes>
    <Route path='all'element={<SpecialityList/>}></Route>
</Routes>
  )
}

export default SpecialityRouting