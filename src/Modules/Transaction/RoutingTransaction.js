import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PaymentList from './PaymentList'

const RoutingTransaction = () => {
  return (
   <Routes>
    <Route path='all' element={<PaymentList/>}></Route>
   </Routes>
  )
}

export default RoutingTransaction