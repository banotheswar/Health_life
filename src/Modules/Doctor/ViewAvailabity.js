import React, { useEffect, useRef, useState } from 'react'
import { DayPilot, DayPilotScheduler } from "daypilot-pro-react";
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'
import Select from "react-select"
import { UseFormValidations } from '../../validations/UseFormValidation';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import moment from 'moment';

const ViewAvailabity = () => {
    const [args,setArgs] =useState("")
const [hospital,setHospital]=useState([])
const [doctors,setDoctor]=useState([])
const {data,handleChangeSearch}=UseFormValidations({})
const [getAllAvil,setgetAllAvil]=useState([])
    let ref = useRef(component => {
        component.calendar = component && component.control;
    });
    const [state, setState] = useState({
        timeHeaders: [{ "groupBy": "Day", "format": "dddd, MMMM d yyyy" }, { "groupBy": "Hour" }, { "groupBy": "Cell", "format": "mm" }],
        scale: "CellDuration",
       
        cellDuration: 15,
        days: DayPilot.Date.today().daysInMonth(),
        startDate: DayPilot.Date.today(),
        showNonBusiness: true,
        timeRangeSelectingStartEndEnabled: true,
        allowEventOverlap: false,
        timeRangeSelectedHandling: "Enabled",
       
        onTimeRangeSelected: async (args) => {
            setArgs(args)
            if (args.start.value > DayPilot.Date.now()) {

               
            } else {
               
                // notify(false, "Not able to Schedule")
            }
        },
        onBeforeCellRender:async(args)=>{
            args.cell.backColor = "#fff";
        },
        onBeforeEventRender: async (args) => {
           
            if (args.data.activity == "Booked" || args.data.startActivity < DayPilot.Date.now()) {
                args.data.deleteDisabled = true;
              
            }
        },
        eventClickHandling: "Disabled",
        eventHoverHandling: "Disabled",
        
        rowMinHeight: 50,
    },
    )
    const getAvailabity=async()=>{
        let res=await GetListById(url?.getAlldoctorAvailability,{id:0})
      await  res?.map(v=>{
            v["start"]=v?.startActivity
             v["end"]=v?.endActivity
             v["barColor"] = "#499ff6 "
             v["resource"]=v?.userId
             v["id"]=v?.id
            })
           
         setgetAllAvil(res)
    }
    const getByIdAvailability=async(id)=>{
    //     let res=await GetListById(url?.doctorByIdAvailability,{id:id})
    //     res?.map(v=>{
    //    v["start"]=v?.startActivity
    //     v["end"]=v?.endActivity
    //     v["barColor"] = "#499ff6 "
    //     v["resource"]=v?.userId
    //     v["id"]=v?.id
    //    })
       let res2=id!=0?doctors?.filter((v)=>v.id==id):doctors;
     await  setState({
            ...state,
           resources:res2
        })
    }
    const getAllHospital=async()=>{
        const res=await GetListById(url?.getAllHospital,{id:0})
       await res&&res?.map(v=>{
            v["label"]=v?.hospitalName
            v["value"]=v?.hospitalId
        })
        setHospital(res)
    }
    const getDoctors = async (id) => {
       
         let res = await GetListById(id==0?url?.getAllDoctors:url.getDoctorByHospital,{id:id})
       let formedList = [];
        if (res && res.length != 0) {
            await res.map((e, i) => {
                let temp = {};
                temp["name"] = e?.firstName + " " + e?.lastName;
                temp["id"] = e?.userId
                temp["value"] = e?.userId
                temp["label"] = e?.firstName + " " + e?.lastName;
                formedList.push(temp)
            })
        }
        setDoctor(formedList)
        setState({ ...state, resources: formedList})
        
}
const calender=(key)=>{
    setState({
        ...state,
        startDate: state.startDate.addDays(key)
      })
   
}
var { ...config } = state;
    
    useEffect(()=>{
    getAllHospital()
    getAvailabity()
    },[])
    useEffect(()=>{
        setState({...state,events: getAllAvil})
    },[getAllAvil])
    
    useEffect(()=>{
        
    getDoctors(data?.hospitalId?.value||0)
        
    },[data?.hospitalId])
 
    useEffect(() => {
        data?.doctorId&& getByIdAvailability(data?.doctorId?.value||0)
      }, [data?.doctorId]);
      console?.log(state.startDate.value,"state.startDate")
  return (
    <div className='row px-2'>
       
        <div className='col-md-12 '>
<div className='heading_list'>View Doctor Availability</div>
        </div>
        <div className='col-md-4 py-2'>
            <label>Select Hospital</label>
            <Select options={hospital} isClearable placeholder="Hospital" onChange={handleChangeSearch("hospitalId")}/>
        </div>
        <div className='col-md-4 py-2'>
            <label>Select Doctor</label>
            <Select options={doctors} isClearable placeholder="Doctor" onChange={handleChangeSearch("doctorId")}/>
        </div>
        <div className='col-md-auto py-2'>
            <label>Date</label>
        <div className='d-flex  gap-2 border  rounded  align-items-center '>
            <div className='btn' onClick={()=>calender(-1)}><FaCircleArrowLeft size={20}/></div>
            <div>{moment(state?.startDate?.value).format("DD-MM-YYYY")}</div>
            <div className='btn'onClick={()=>calender(+1)}><FaCircleArrowRight size={20} /></div>
        </div>
        </div>
        <div>
        <DayPilotScheduler 
                className="scroll"
                {...config}
                ref={ref}
                
            />
        </div>
    </div>
  )
}

export default ViewAvailabity