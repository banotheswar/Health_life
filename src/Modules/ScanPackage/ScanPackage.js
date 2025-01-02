import React, { useEffect, useState } from 'react'
import ReactTableShare from '../../components/ReactTableShare'
import { GetListById, icons, save } from '../../components/ShareComp'
import { url } from '../../services/Urls'

import Select from "react-select"
import Add from './Add'
const ScanPackage = () => {
  const [list,setList]=useState([])
  const [search,setSearch]=useState("")
  const [model,setModel]=useState(false)
  const [update,setUpdate]=useState([])
  const getAllScan=async()=>{
    let res=await GetListById(url.individualPack,{id:0})
    res?.map(v=>{
      v["services"]=v?.services&&JSON.parse(v.services)
    })
    setList(res)
  }
  const submit=async(obj)=>{
    const res=await save(url?.saveIndividual,obj);
setUpdate(res)
setModel(false)
  }
  
  const columns=[
    {name:"Package Name",selector:(v)=>v.packageName,sortable:true,width:""},
    {name:"Amount",selector:(v)=>"Rs."+" "+v?.amount,sortable:true,width:""},
    {name:"scans Count",selector:(v)=>v?.scansCount,sortable:true,width:""},
    {name:"what's Includes",selector:(v)=>Array.isArray(v.services) &&v.services?.map(v=><div>{v.label.toString(",")}</div>),sortable:true,width:""},
    {name:"Discription",selector:(v)=><div className='text-wrap'>{v?.description}</div>,sortable:true,width:""},
    {name:"Action",selector:(v)=><div className='ptr' onClick={()=>setModel(v)}>{icons?.edit}</div>,width:""},

  ]
  
  const handleChang = () =>(e)=> {
    setSearch(e.target.value)
  }

  const listsearch = () => {
    return (<div className=' col-md-12 d-flex flex-wrap gap-1 ' >
      
     <div className='col'>
     <input type="search" className="form-control  "
        value={search!=""?search:""} onChange={handleChang()} placeholder="Search Package..." />
     </div>
     
      
    </div>)
  }
  useEffect(()=>{getAllScan()},[update])
  return (
    <div >
       <div className='d-flex flex-wrap py-1'>
        <div className='col-md-6 px-2 heading_list '>Scan Individual Package</div>
        <div className='col-md-6 d-flex flex-wrap gap-2 justify-content-end'>
        
        <div className='btn bg_btn col-auto text-white d-flex gap-2 align-items-center' onClick={()=>setModel(!model)}>
          {icons.add}<span className='color2'>Add Package</span>
        </div>
        </div>
        </div>
    <div className='py-2'>
    <ReactTableShare dataTable={list} columns={columns||[]} search1={listsearch} search={search} /></div>
      { model&&<Add show={model} onHide={()=>setModel(false)} submit={submit}/>}
    </div>
  )
}

export default ScanPackage