import React, { useEffect, useState } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"
import { useSelector } from 'react-redux';
const CreateDoctor = (props) => {
    
    const {facilityList,specialtyList,doctorList}=props;
    const faciList=[...facilityList]?.filter((v)=>v.status!="InActive"&&v.status)
    const speciList=[...specialtyList]?.filter((v)=>v.status!="InActive"&&v.status)
    const submit=()=>{
        data["id"]=props?.show?.id?props?.show?.id:doctorList?.length+1
        data["item"]=props?.show?.id?"Exist":"New"
        props?.submit(data)
    }
   
    const {data,errors,handleChange,phoneFormart,handleMaxChange,handleMultiSelect,handleChangeSearch,handleAlphabetChange,handleSubmit,setValues,handleDataChange}=UseFormValidations({
        initialValues: {
            firstName: "",
            lastName: "",
            email:"",
            phone:"",
            dob:"",
            gender:"",
            facility:"",
            speciality:""
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
              speciality: {
                required: {
                  value: true,
                  message: "Please enter your First Name",
                },
              },
              facility: {
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
      return errors?.[key]&&errors?.[key]?`form-control border border-danger py-2 ${select}`:`form-control py-2 ${select}`
      }
      const ErrorValueTwo=(key)=>{
        return errors?.[key]&&errors?.[key]?`rounded border border-danger`:``
        }
    
    useEffect(()=>{
        if (props?.show?.id){
            setValues(props?.show)
        }
    },[props?.show])
    console?.log(data,props)
  return (
    <Modal  {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>{props?.show?.id?"Edit Doctor":"Add Doctor"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
    
<div className="col-md-6 py-1">
    <label>First Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("firstName")} placeholder='First Name' value={returnValue("firstName")} onChange={handleAlphabetChange("firstName")}/>

</div>
<div className="col-md-6 py-1">
    <label>Last Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("lastName")} placeholder='Last Name' value={returnValue("lastName")} onChange={handleAlphabetChange("lastName")}/>

</div>
<div className="col-md-6 py-1">
    <label>E-Mail <span className='text-danger'>*</span></label>
    <input className={ErrorValue("email")} placeholder='E-Mail' value={returnValue("email")} onChange={handleChange("email")}/>

</div>
<div className="col-md-6 py-1">
    <label>Phone <span className='text-danger'>*</span></label>
    <input className={ErrorValue("phone")} placeholder='Phone' value={phoneFormart(data?.phone)}  onChange={handleMaxChange("phone","10")}/>

</div>
<div className="col-md-6 py-1">
    <label>DOB <span className='text-danger'>*</span></label>
    <DatePicker 
     peekNextMonth
     showMonthDropdown
     showYearDropdown 
      scrollableYearDropdown 
      maxDate={new Date()}
     className={ErrorValue("dob")} placeholderText='DOB' selected={data?.dob} onChange={(e)=>handleDataChange("dob",e)} />
</div>
<div className="col-md-6 py-1">
    <label>Gender <span className='text-danger'>*</span></label>
    <select className={ErrorValue("gender","form-select")} placeholder='Gender' value={returnValue("gender")} onChange={handleChange("gender")}>
        <option value={""}>Select</option>
        <option>Female</option>
        <option>Male</option>
        <option>Others</option>
    </select>

</div>
<div className="col-md-6 py-1">
    <label>Facility<span className='text-danger'>*</span></label>
    <Select placeholder={"Select.."} className={ErrorValueTwo("facility")}
    value={data?.facility}
     options={faciList?.map(v=>{return {label:v?.facilityName,value:v?.facilityName}})}
     onChange={handleChangeSearch("facility")}

     />
</div>
<div className="col-md-6 py-1">
    <label>Speciality<span className='text-danger'>*</span></label>
   <Select 
   placeholder={"Select.."} 
    className={ErrorValueTwo("speciality")}
    isMulti={true}
    value={data?.speciality}
    options={speciList?.map(v=>{return {label:v?.name,value:v?.name}})}
    onChange={handleMultiSelect("speciality")}
    />

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

export default CreateDoctor