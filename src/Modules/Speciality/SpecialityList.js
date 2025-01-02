import React, { useEffect, useState } from 'react'
import {icons, save, statusChange, submitData } from '../../components/ShareComp'
import ReactTableShare from '../../components/ReactTableShare'
import CreateSpeciality from './CreateSpeciality'
import { url } from '../../services/Urls'
import { useDispatch, useSelector } from 'react-redux'
import Status from '../../components/Status'
import { specialityCallBack } from '../../redux/Action'

const SpecialityList = () => {
   
    const [search,setSearch]=useState("")
    const [model,setModel]=useState(false)
  
   const specialtyList=useSelector((state)=>state?.specialtyList);
   const dispatch=useDispatch()
    const submit=async(obj)=>{
      submitData(dispatch,specialityCallBack,obj,specialtyList,setModel,"Speciality")
    }
    
    const columns=[
      {name:"Id",selector:(v)=>v.id,sortable:true,width:"5rem"},
      {name:"Speciality Name",cell:(v)=>v.name,selector:(v)=>v.name,sortable:true,width:""},
      {name:"Img",selector:(v)=>v.img,sortable:true,width:""},
      {name:"Status",cell:(v)=><Status obj={v} statusChange={()=>statusChange(v,specialtyList,dispatch,setModel,specialityCallBack)}/>,selector:(v)=><Status obj={v} statusChange={()=>statusChange(v,specialtyList,dispatch,setModel)}/>},
     
      {name:"Action",selector:(v)=><div className='ptr' onClick={()=>setModel(v)}>{icons?.edit}</div>,width:""},
  
    ]
    
    const handleChang = () =>(e)=> {
      setSearch(e.target.value)
    }
  
    const listsearch = () => {
      return (<div className=' d-flex flex-wrap ' style={{ width: "100%" }}>
        
       <div className='col'>
       <input type="search"  className="form-control search-control search-bg "
          value={search!=""?search:""} onChange={handleChang()} placeholder="Search Speciality..." />
       </div>
        
       
      </div>)
    }
   
    return (
      <div >
          <div className='d-flex flex-wrap py-1'>
        <div className='col-md-6 px-2 heading_list '>Speciality</div>
        <div className='col-md-6 d-flex flex-wrap gap-2 justify-content-end'>
        
        <div className='btn bg_btn col-auto text-white d-flex gap-2 align-items-center' onClick={()=>setModel(!model)}>
          {icons.add}<span className='color2'>Add Speciality</span>
        </div>
        </div>
        </div>
      <div className='py-2'><ReactTableShare dataTable={specialtyList} columns={columns||[]} search1={listsearch} search={search}/></div>
        { model&&<CreateSpeciality show={model} state={specialtyList} onHide={()=>setModel(false)} submit={submit}/>}
      </div>
    )
}

export default SpecialityList