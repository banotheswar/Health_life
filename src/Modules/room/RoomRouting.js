import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoomList from './RoomList'

const RoomRouting = () => {
  return (
    <Routes>
        <Route path={"all"} element={<RoomList/>}></Route>
    </Routes>
  )
}

export default RoomRouting