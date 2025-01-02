import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserListing from './UserListing'

const UserRouting = () => {
  return (
    <Routes>
    <Route path='all'element={<UserListing/>}></Route>
</Routes>
  )
}

export default UserRouting