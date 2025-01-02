import React from 'react'
import { Routes,Route } from 'react-router-dom'
import OrganizationList from './OrganizationList'

const RoutingOrg = () => {
  return (
    <Routes>
        <Route path='all' element={<OrganizationList/>}></Route>
    </Routes>
  )
}

export default RoutingOrg