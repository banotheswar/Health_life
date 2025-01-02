import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaHospitalUser, FaIdCard } from 'react-icons/fa'
import { GrSchedules } from 'react-icons/gr'
import { LuUsers } from 'react-icons/lu'
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'
import AppointmentList from "../Appointment/AppointmentList"
import moment from 'moment'

const AdminDashbord = () => {
  const [hospital,setHospital]=useState([]);
  const [doctor,setDoctor]=useState([]);
  const [app,setApp]=useState([]);
  const [count,setCount]=useState({})
  const list=[
    { label:"Total Appointment",color:"#FBE285",count:count?.appointmentCount||0,icon: <GrSchedules size={18}/>},
    { label:"Total Hospital",color:"#dff3f8",count:count?.hospitalCount||0,icon: <FaHospitalUser size={18}/>},
    { label:"Total User",color:"#FFDDC1",count:count?.patientCount||0,icon:<LuUsers size={18} />},
    { label:"New Subscribed",color:"#F6F6F6", list:[
      {label:"Annually",value:count?.premiumCount,color:"plan-premium",},
      {label:"Quarterly",value:count?.eliteCount,color:"plan-elite ",},
      {label:"Monthly",value:count?.standardCount,color:"plan-standard",}, 
    ],icon:<FaIdCard size={18} />},
    // { label:"Total Sale",color:"#D0E9BC",count:"90",icon:<FaCartPlus size={18} />},
  ]
  const Hospitals=async()=>{
    let res=await GetListById(url.orderListHospital,{id:0});
    res?.map(v=>{
      v["label"]=v?.hospitalName
      v["value"]=v?.hospitalId
    })
    setHospital(res)
  }
  // const Doctors=async()=>{
  //   let res=await GetListById(url.getAllDoctors,{id:0});
  //   res?.map(v=>{
  //     v["label"]=v?.userName
  //     v["value"]=v?.userId
  //   })
  //   setDoctor(res)
  // }
  const AllAppointment=async()=>{
    let res=await GetListById(url.getAllAppointment,{id:0})
    res?.map(v=>{
      v["type"]=v?.teleConsultation=="yes"?"Tele Consultation":"Hospital Visit"
      v["preferredDate"]=moment(v?.preferredDate).format("DD-MM-YYYY")
    })
    setApp(res)
  }
  const AllCount=async()=>{
    let res=await GetListById(url?.getAllCount)
    setCount(res[0])
    console?.log(res,"res")
  }
  useEffect(()=>{
    AllCount()
    Hospitals()
    // Doctors()
    AllAppointment()
  },[])
  return (
   <div className='px-2'>
    
    <div className='d-flex flex-wrap py-2 '>
       {
        list?.map(v=>{
          return (
            <div className=' col px-1' >
            <div className='  card border text-start p-2'style={{backgroundColor:v?.color,zIndex:"-1"}}>
{!v?.list&&<div className='d-flex flex-wrap p-1'>
<div className='col-md-10 color3'>
  {v?.label}
  <div className='color3 mt-2 border w-25 text-center bg-white py-1 'style={{borderRadius:"20px"}}>{v.count}</div>
  
  </div>
  <div className='col-md-1 text-center'>{v?.icon}</div>
   
 
</div>}
<div className='d-flex flex-wrap justify-content-around'>
{
    v?.list?.map(sub=>{
     return  <div className='py-1'>
     <div className={'px-1 col color3'}>{sub?.label}</div>
     <div className={`${sub.color} px-1 color3 text-center mt-2`}>{sub?.value}</div>
     </div>
    })
  } 
</div>
            </div>
          </div>
          )
        })
       }
    </div>
    <AppointmentList list={app} doctor={doctor} hospital={hospital}/>
   
   </div>
  )
}

export default AdminDashbord