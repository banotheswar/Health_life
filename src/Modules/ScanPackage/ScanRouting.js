import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ScanPackage from './ScanPackage'

const ScanRouting = () => {
 
    return (
        <Routes>
            <Route path={"all"} element={<ScanPackage/>}></Route>
        </Routes>
      )
  
}

export default ScanRouting