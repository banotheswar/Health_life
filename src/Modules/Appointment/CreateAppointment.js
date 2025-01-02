import React, { useEffect, useState } from 'react'
import { GetListById } from '../../components/ShareComp';
import { UseFormValidations } from '../../validations/UseFormValidation';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { url } from '../../services/Urls';
import Select from "react-select"
const CreateAppointment = (props) => {
  const [roles,setRoles]=useState([])
  const submit=()=>{
      data["userId"]=data?.userId?data?.userId:0;
      data["roleId"]=4
      data["organizationId"]=1
      props?.submit(data)
  }
  const getAllrole=async()=>{
      let res= await GetListById(url.getAllRoles,{id:0});
      setRoles(res)
  }
  const {data,errors,handleChange,handleNumberChange,handleMultiSelectDropdown,handleSubmit,setValues,handleDataChange}=UseFormValidations({
      initialValues:{
  
      },
      validationSchema:{
  
      },
      submit:submit
  })
  const returnValue=(key)=>{
      return data?.[key]&&data?.[key]?data?.[key]:""
  }
  const ErrorValue=(key)=>{
  return errors?.[key]&&errors?.[key]?" form-control border border-danger":"form-control"
  }
  useEffect(()=>{getAllrole()},[])
  useEffect(()=>{
      if (props?.show?.userId){
          setValues(props?.show)
      }
  },[props?.show?.userId])
return (
  <Modal  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
  <Modal.Header >
    <Modal.Title>Add Appointment</Modal.Title>
  </Modal.Header>
 <form onSubmit={handleSubmit}>
 <Modal.Body>
   <div className='row'>
  
<div className="col-md-6">
  <label>Select Hospital</label>
  <Select className={""} placeholder='Hospital' value={returnValue("firstName")} onChange={handleChange("firstName")}/>

</div>
<div className="col-md-6">
  <label>Select Patient</label>
  <Select className={""} placeholder='Patient' value={returnValue("lastName")} onChange={handleChange("lastName")}/>

</div>
<div className="col-md-6">
  <label>Select Doctor</label>
  <Select className={""} placeholder='Doctor' value={returnValue("email")} onChange={handleChange("email")}/>

</div>
<div className="col-md-6">
  <label>Availability Date</label>
  <DatePicker className='form-control' placeholderText='Date' selected={data?.dob} onChange={(e)=>handleDataChange("dob",e)} />

</div>
<div className="col-md-3">
  <label>Start Time</label>
  <DatePicker className='form-control' placeholderText='Start Time' selected={data?.dob} onChange={(e)=>handleDataChange("dob",e)} />

</div>
<div className="col-md-3">
  <label>End Time</label>
  <DatePicker className='form-control' placeholderText='End Time' selected={data?.dob} onChange={(e)=>handleDataChange("dob",e)} />

</div>

<div className="col-md-6">
  <label>Appointment type</label>
  <input className={ErrorValue("phone")} placeholder='Type' value={returnValue("phone")} onChange={handleChange("phone")}/>

</div>
<div className="col-md-6">
  <label>Reason</label>
 
  <textarea className='form-control'/>
</div>
<div className="col-md-6">
  <label>Note</label>
 <textarea className='form-control'/>

</div>




   </div>
  </Modal.Body>
  <Modal.Footer>
    <button className='btn border px-5' onClick={()=>props?.onHide()} >
      Close
    </button>
    <button className='bg_btn btn text-white px-5'>
      Save 
    </button>
  </Modal.Footer>
 </form>
</Modal>
)
}

export default CreateAppointment