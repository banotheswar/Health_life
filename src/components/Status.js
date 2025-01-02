import React from 'react'
import { MdToggleOff, MdToggleOn } from 'react-icons/md'

const Status = ({statusChange,obj}) => {

  return (
    <div className="text-wrap" onClick={statusChange}>{obj?.status=="Active"?<MdToggleOn size={25} className='text-success'/>:<MdToggleOff size={25} className='text-danger'/>}</div>
  )
}

export default Status