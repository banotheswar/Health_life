import React, { useEffect, useState } from 'react'
import { GetListById } from '../../components/ShareComp'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { url } from '../../services/Urls'


const CreatePatient = (props) => {
  const [roles,setRoles]=useState([])
    const submit=()=>{
        data["userId"]=data?.userId?data?.userId:0
        data["roleId"]=5
        data["organizationId"]=sessionStorage.getItem("organizationId")
        props?.submit(data)
    }
    const getAllrole=async()=>{
        let res= await GetListById(url.getAllRoles,{id:0});
        setRoles(res)
    }
    const {data,errors,handleChange,handleNumberChange,handleAlphabetChange,handleSubmit,setValues,handleDataChange}=UseFormValidations({
        initialValues: {
            firstName: "",
            lastName: "",
            email:"",
            phone:"",
            dob:"",
            gender:"",
            weight:"",
            height:""
          },
          validationSchema: {
            
            firstName: {
              required: {
                value: true,
                message: "Please enter your First Name",
              },
            },
            lastName: {
              required: {
                value: true,
                message: "Please enter your First Name",
              },
            },
            email: {
                required: {
                    value: true,
                    message: "Please enter a valid Email",
                },
                pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Please enter a valid email id",
                },
              },
              phone: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
                minlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
                maxlength:{
                    value: 10,
                    message: "Please enter your Last Name",
                },
              },
              dob: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
              gender: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
              weight: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
              height: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
          },
        submit:submit
    })
    const returnValue=(key)=>{
        return data?.[key]&&data?.[key]?data?.[key]:""
    }
    const ErrorValue=(key,select)=>{
    return errors?.[key]&&errors?.[key]?`form-control border border-danger ${select}`:`form-control ${select}`
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
      <Modal.Title>{props?.show?.userId?"Edit Patient":"Add Patient"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
    
<div className="col-md-6">
    <label>First Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("firstName")} placeholder='First Name' value={returnValue("firstName")} onChange={handleAlphabetChange("firstName")}/>

</div>
<div className="col-md-6">
    <label>Last Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("lastName")} placeholder='Last Name' value={returnValue("lastName")} onChange={handleAlphabetChange("lastName")}/>

</div>
<div className="col-md-6">
    <label>E-Mail<span className='text-danger'>*</span></label>
    <input className={ErrorValue("email")} placeholder='E-Mail' value={returnValue("email")} onChange={handleChange("email")}/>
    

</div>
<div className="col-md-6">
    <label>Phone <span className='text-danger'>*</span></label>
    <input className={ErrorValue("phone")} placeholder='Phone' value={returnValue("phone")} maxLength={10} onChange={handleNumberChange("phone")}/>

</div>
<div className="col-md-6">
    <label>DOB <span className='text-danger'>*</span></label>
    <DatePicker 
     peekNextMonth
     showMonthDropdown
     showYearDropdown 
      scrollableYearDropdown 
    className={ErrorValue("dob")} placeholderText='DOB' selected={data?.dob} onChange={(e)=>handleDataChange("dob",e)} />
</div>
<div className="col-md-6">
    <label>Gender <span className='text-danger'>*</span></label>
    <select className={ErrorValue("gender","form-select")} placeholder='Gender' value={returnValue("gender")} onChange={handleChange("gender")}>
        <option value={""}>Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
    </select>

</div>
<div className="col-md-6">
    <label>Weight (Kgs)<span className='text-danger'>*</span></label>
    <input type='number' className={ErrorValue("weight")} placeholder='Weight' value={returnValue("weight")} onChange={handleNumberChange("weight")}/>

</div>
<div className="col-md-6">
    <label>Height (cm)<span className='text-danger'>*</span></label>
    <input type='number' className={ErrorValue("height")} placeholder='Height' value={returnValue("height")} onChange={handleNumberChange("height")}/>

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

export default CreatePatient