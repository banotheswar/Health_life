import React from 'react'
import { Route, Routes } from 'react-router-dom'

import FacilityList from './FacilityList'

const FacilityRouting = () => {
  return (
    <Routes>
        <Route path='all'element={<FacilityList/>}></Route>
    </Routes>
  )
}

export default FacilityRouting